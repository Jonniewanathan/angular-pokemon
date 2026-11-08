import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavouritesService } from '../../services/favourites.service';
import { NoteFormComponent } from './note-form.component';

describe('NoteFormComponent', () => {
  let fixture: ComponentFixture<NoteFormComponent>;
  let service: FavouritesService;

  const textarea = () => fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
  const submit = () =>
    fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
  const alert = () => fixture.nativeElement.querySelector('[role="alert"]') as HTMLElement | null;

  function type(value: string): void {
    textarea().value = value;
    textarea().dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [NoteFormComponent] });
    service = TestBed.inject(FavouritesService);
    fixture = TestBed.createComponent(NoteFormComponent);
    fixture.componentRef.setInput('name', 'pikachu');
    fixture.detectChanges();
  });

  it('shows no error before the field is touched', () => {
    expect(alert()).toBeNull();
  });

  it('shows a required error when saving an empty note', () => {
    submit().click();
    fixture.detectChanges();
    expect(alert()?.textContent).toContain('Note is required');
  });

  it('shows an error when leaving the field with too little text', () => {
    type('hi');
    textarea().dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(alert()?.textContent).toContain('at least 3 characters');
  });

  it('does not save an invalid note', () => {
    type('hi');
    submit().click();
    fixture.detectChanges();
    expect(service.notes()).toEqual({});
  });

  it('saves a trimmed note and shows it', () => {
    type('  Fast one  ');
    submit().click();
    fixture.detectChanges();
    expect(service.notes()['pikachu']).toBe('Fast one');
    expect(fixture.nativeElement.textContent).toContain('Saved note: Fast one');
  });
});
