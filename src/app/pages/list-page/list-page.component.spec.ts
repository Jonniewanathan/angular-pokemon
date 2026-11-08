import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ListPageComponent } from './list-page.component';

const LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=2000';

const mockList = {
  count: 3,
  results: [
    { name: 'bulbasaur', url: '' },
    { name: 'ivysaur', url: '' },
    { name: 'pikachu', url: '' },
  ],
};

describe('ListPageComponent', () => {
  let fixture: ComponentFixture<ListPageComponent>;
  let http: HttpTestingController;

  const text = () => (fixture.nativeElement as HTMLElement).textContent ?? '';
  const names = () =>
    Array.from(fixture.nativeElement.querySelectorAll('li a') as NodeListOf<HTMLElement>).map((a) =>
      a.textContent?.trim(),
    );

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [ListPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ListPageComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    http.verify();
    vi.useRealTimers();
  });

  it('shows loading, then the list', () => {
    expect(text()).toContain('Loading...');

    http.expectOne(LIST_URL).flush(mockList);
    fixture.detectChanges();

    expect(names()).toEqual(['bulbasaur', 'ivysaur', 'pikachu']);
    expect(text()).toContain('3 results');
  });

  it('shows an error when the request fails', () => {
    http.expectOne(LIST_URL).flush('boom', { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    expect(text()).toContain('Error:');
    expect(text()).toContain('500');
  });

  it('filters by the search text after the debounce', () => {
    vi.useFakeTimers();
    http.expectOne(LIST_URL).flush(mockList);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'pika';
    input.dispatchEvent(new Event('input'));

    vi.advanceTimersByTime(299);
    fixture.detectChanges();
    expect(names()).toHaveLength(3);

    vi.advanceTimersByTime(1);
    fixture.detectChanges();
    expect(names()).toEqual(['pikachu']);
    expect(text()).toContain('1 results');
  });
});
