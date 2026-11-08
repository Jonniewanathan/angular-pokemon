import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { FavouritesService } from './services/favourites.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly favouritesCount = inject(FavouritesService).count;
}
