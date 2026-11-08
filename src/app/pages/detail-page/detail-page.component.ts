import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { FavouriteButtonComponent } from '../../components/favourite-button/favourite-button.component';
import { PokemonDetail } from '../../models/pokemon-detail.model';
import { PokemonService } from '../../services/pokemon.service';
import { NgOptimizedImage } from '@angular/common';
import { FavouritesService } from '../../services/favourites.service';
import { NoteFormComponent } from '../../components/note-form/note-form.component';

@Component({
  selector: 'app-detail-page',
  imports: [RouterLink, FavouriteButtonComponent, NoteFormComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss',
})
export class DetailPageComponent {
  private readonly pokemonService = inject(PokemonService);

  readonly name = input.required<string>();

  readonly detail = signal<PokemonDetail | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  private readonly favouritesService = inject(FavouritesService);

  readonly isFavourite = computed(() => this.favouritesService.favourites().includes(this.name()));

  readonly typeNames = computed(
    () =>
      this.detail()
        ?.types.map((t) => t.type.name)
        .join(', ') ?? '',
  );

  constructor() {
    toObservable(this.name)
      .pipe(
        tap(() => {
          this.loading.set(true);
          this.error.set(null);
        }),
        switchMap((name) =>
          this.pokemonService.getDetail(name).pipe(
            catchError((err: HttpErrorResponse) => {
              this.error.set(err.status === 404 ? 'Pokémon not found' : err.message);
              this.detail.set(null);
              this.loading.set(false);
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((detail) => {
        this.detail.set(detail);
        this.loading.set(false);
      });
  }
}
