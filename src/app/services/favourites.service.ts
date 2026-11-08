import { computed, effect, Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'favourites';
const NOTES_KEY = 'favourite-notes';
@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private readonly state = signal<string[]>(this.load());

  private readonly notesState = signal<Record<string, string>>(this.loadNotes());
  readonly notes = this.notesState.asReadonly();

  readonly favourites = this.state.asReadonly();
  readonly count = computed(() => this.state().length);

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state()));
    });
    effect(() => {
      localStorage.setItem(NOTES_KEY, JSON.stringify(this.notesState()));
    });
  }

  toggle(name: string): void {
    this.state.update((list) =>
      list.includes(name) ? list.filter((n) => n !== name) : [...list, name],
    );
  }

  private load(): string[] {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === 'string')
        : [];
    } catch {
      return [];
    }
  }

  setNote(name: string, note: string): void {
    this.notesState.update((notes) => ({ ...notes, [name]: note }));
  }

  private loadNotes(): Record<string, string> {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(NOTES_KEY) ?? '{}');
      return parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)
        ? (parsed as Record<string, string>)
        : {};
    } catch {
      return {};
    }
  }
}
