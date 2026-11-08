import { Routes } from '@angular/router';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FavouritesPageComponent } from './pages/favourites-page/favourites-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: ListPageComponent },
  { path: 'pokemon/:name', component: DetailPageComponent },
  { path: 'favourites', component: FavouritesPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
