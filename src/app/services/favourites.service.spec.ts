import { TestBed } from '@angular/core/testing';
import { FavouritesService } from './favourites.service';

describe('FavouritesService', () => {
  let service: FavouritesService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesService);
  });

  it('adds a favourite', () => {
    service.toggle('pikachu');
    expect(service.favourites()).toEqual(['pikachu']);
    expect(service.count()).toBe(1);
  });

  it('removes a favourite when toggled twice', () => {
    service.toggle('pikachu');
    service.toggle('pikachu');
    expect(service.favourites()).toEqual([]);
  });

  it('keeps the other favourites when removing one', () => {
    service.toggle('pikachu');
    service.toggle('eevee');
    service.toggle('pikachu');
    expect(service.favourites()).toEqual(['eevee']);
  });

  it('stores a note per Pokémon', () => {
    service.setNote('pikachu', 'fast');
    service.setNote('eevee', 'cute');
    expect(service.notes()).toEqual({ pikachu: 'fast', eevee: 'cute' });
  });

  it('persists favourites and notes to localStorage', () => {
    service.toggle('pikachu');
    service.setNote('pikachu', 'fast');
    TestBed.tick();
    expect(localStorage.getItem('favourites')).toBe('["pikachu"]');
    expect(localStorage.getItem('favourite-notes')).toBe('{"pikachu":"fast"}');
  });

  it('loads saved favourites when created', () => {
    localStorage.setItem('favourites', '["eevee"]');
    TestBed.resetTestingModule();
    service = TestBed.inject(FavouritesService);
    expect(service.favourites()).toEqual(['eevee']);
  });

  it('ignores corrupted storage', () => {
    localStorage.setItem('favourites', 'not json');
    TestBed.resetTestingModule();
    service = TestBed.inject(FavouritesService);
    expect(service.favourites()).toEqual([]);
  });
});
