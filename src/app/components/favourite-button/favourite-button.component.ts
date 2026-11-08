import { Component, computed, inject, input } from '@angular/core';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrl: './favourite-button.component.scss',
})
export class FavouriteButtonComponent {
  private readonly favouritesService = inject(FavouritesService);

  readonly name = input.required<string>();

  readonly isFavourite = computed(() => this.favouritesService.favourites().includes(this.name()));

  toggle(): void {
    this.favouritesService.toggle(this.name());
  }
}
