import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-pokemon');
}
