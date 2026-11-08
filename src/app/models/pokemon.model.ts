export interface PokemonSummary {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: PokemonSummary[];
}
