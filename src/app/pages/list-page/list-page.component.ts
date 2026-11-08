import { Component, computed, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';
import { PokemonSummary } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-list-page',
  imports: [ReactiveFormsModule],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent implements OnInit {
  private readonly pokemonService = inject(PokemonService);
  private readonly destroyRef = inject(DestroyRef);

  readonly pokemon = signal<PokemonSummary[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly searchControl = new FormControl('', { nonNullable: true });

  private readonly query = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      map((value) => value.trim().toLowerCase()),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );

  readonly matches = computed(() => this.pokemon().filter((p) => p.name.includes(this.query())));

  ngOnInit(): void {
    this.pokemonService
      .getList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.pokemon.set(data.results);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.message ?? 'Something went wrong');
          this.loading.set(false);
        },
      });
  }
}
