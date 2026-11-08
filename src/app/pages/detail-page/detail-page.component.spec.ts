import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PokemonDetail } from '../../models/pokemon-detail.model';
import { DetailPageComponent } from './detail-page.component';

const url = (name: string) => `https://pokeapi.co/api/v2/pokemon/${name}`;

const pikachu: PokemonDetail = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  types: [{ type: { name: 'electric' } }],
  sprites: { front_default: null },
};

describe('DetailPageComponent', () => {
  let fixture: ComponentFixture<DetailPageComponent>;
  let http: HttpTestingController;

  const text = () => (fixture.nativeElement as HTMLElement).textContent ?? '';

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [DetailPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(DetailPageComponent);
    fixture.componentRef.setInput('name', 'pikachu');
    fixture.detectChanges();
  });

  afterEach(() => {
    http.verify();
  });

  it('shows loading, then the details', () => {
    expect(text()).toContain('Loading...');

    http.expectOne(url('pikachu')).flush(pikachu);
    fixture.detectChanges();

    expect(text()).toContain('pikachu #25');
    expect(text()).toContain('Types: electric');
  });

  it('shows a not found message on a 404', () => {
    http.expectOne(url('pikachu')).flush(null, { status: 404, statusText: 'Not Found' });
    fixture.detectChanges();

    expect(text()).toContain('Pokémon not found');
  });

  it('cancels the previous request when the name changes', () => {
    const first = http.expectOne(url('pikachu'));

    fixture.componentRef.setInput('name', 'eevee');
    fixture.detectChanges();

    expect(first.cancelled).toBe(true);

    http
      .expectOne(url('eevee'))
      .flush({ ...pikachu, id: 133, name: 'eevee', types: [{ type: { name: 'normal' } }] });
    fixture.detectChanges();

    expect(text()).toContain('eevee #133');
    expect(text()).not.toContain('pikachu');
  });
});
