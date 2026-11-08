import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FavouritesService } from '../../services/favourites.service';
import { FavouritesPageComponent } from './favourites-page.component';

describe('FavouritesPageComponent', () => {
  let fixture: ComponentFixture<FavouritesPageComponent>;
  let service: FavouritesService;

  const links = () =>
    Array.from(fixture.nativeElement.querySelectorAll('li a') as NodeListOf<HTMLAnchorElement>);

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [FavouritesPageComponent],
      providers: [provideRouter([])],
    });
    service = TestBed.inject(FavouritesService);
    fixture = TestBed.createComponent(FavouritesPageComponent);
    fixture.detectChanges();
  });

  it('shows an empty message when there are no favourites', () => {
    expect(fixture.nativeElement.textContent).toContain('No favourites yet.');
    expect(links()).toHaveLength(0);
  });

  it('lists favourites as links to their detail pages', () => {
    service.toggle('pikachu');
    service.toggle('eevee');
    fixture.detectChanges();

    expect(links().map((a) => a.textContent?.trim())).toEqual(['pikachu', 'eevee']);
    expect(links().map((a) => a.getAttribute('href'))).toEqual([
      '/pokemon/pikachu',
      '/pokemon/eevee',
    ]);
  });
});
