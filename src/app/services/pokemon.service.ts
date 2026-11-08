import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonListResponse } from '../models/pokemon.model';
import { PokemonDetail } from '../models/pokemon-detail.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly http = inject(HttpClient);

  getList(): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=2000');
  }

  getDetail(name: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(
      `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`,
    );
  }
}
