import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouritesService } from '../../services/favourites.service';
import { FavouriteButtonComponent } from './favourite-button.component';

describe('FavouriteButtonComponent', () => {
  let fixture: ComponentFixture<FavouriteButtonComponent>;
  let service: FavouritesService;

  const button = (): HTMLButtonElement => fixture.nativeElement.querySelector('button');

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [FavouriteButtonComponent] });
    service = TestBed.inject(FavouritesService);
    fixture = TestBed.createComponent(FavouriteButtonComponent);
    fixture.componentRef.setInput('name', 'pikachu');
    fixture.detectChanges();
  });

  it('shows an empty star when not a favourite', () => {
    expect(button().textContent?.trim()).toBe('☆');
    expect(button().getAttribute('aria-pressed')).toBe('false');
  });

  it('shows a filled star when already a favourite', () => {
    service.toggle('pikachu');
    fixture.detectChanges();
    expect(button().textContent?.trim()).toBe('★');
    expect(button().getAttribute('aria-pressed')).toBe('true');
  });

  it('toggles when clicked', () => {
    button().click();
    fixture.detectChanges();
    expect(button().textContent?.trim()).toBe('★');
    expect(service.favourites()).toEqual(['pikachu']);

    button().click();
    fixture.detectChanges();
    expect(button().textContent?.trim()).toBe('☆');
    expect(service.favourites()).toEqual([]);
  });
});
