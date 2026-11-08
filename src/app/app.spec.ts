import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FavouritesService } from './services/favourites.service';
import { App } from './app';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    });
  });

  it('creates the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('shows the favourites count in the nav', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nav').textContent).toContain('Favourites (0)');

    TestBed.inject(FavouritesService).toggle('pikachu');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nav').textContent).toContain('Favourites (1)');
  });
});
