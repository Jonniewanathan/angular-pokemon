import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavouriteButtonComponent } from '../../components/favourite-button/favourite-button.component';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-favourites-page',
  imports: [RouterLink, FavouriteButtonComponent],
  templateUrl: './favourites-page.component.html',
  styleUrl: './favourites-page.component.scss',
})
export class FavouritesPageComponent {
  readonly favourites = inject(FavouritesService).favourites;
}
