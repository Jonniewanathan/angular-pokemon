import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PokemonListResponse } from '../models/pokemon.model';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('requests the full list with a GET', () => {
    const mock: PokemonListResponse = { count: 1, results: [{ name: 'pikachu', url: '' }] };
    let result: PokemonListResponse | undefined;

    service.getList().subscribe((response) => (result = response));

    const req = http.expectOne('https://pokeapi.co/api/v2/pokemon?limit=2000');
    expect(req.request.method).toBe('GET');
    req.flush(mock);

    expect(result).toEqual(mock);
  });

  it('encodes the name in the detail request', () => {
    service.getDetail('mr. mime').subscribe();

    const req = http.expectOne('https://pokeapi.co/api/v2/pokemon/mr.%20mime');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
