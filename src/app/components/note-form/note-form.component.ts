import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FavouritesService } from '../../services/favourites.service';
import { noteValidator } from '../../validators/note.validator';

@Component({
  selector: 'app-note-form',
  imports: [ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss',
})
export class NoteFormComponent implements OnInit {
  private readonly favouritesService = inject(FavouritesService);

  readonly name = input.required<string>();

  readonly form = new FormGroup({
    note: new FormControl('', { nonNullable: true, validators: [noteValidator] }),
  });
  readonly noteControl = this.form.controls.note;

  readonly savedNote = computed(() => this.favouritesService.notes()[this.name()] ?? '');

  ngOnInit(): void {
    this.noteControl.setValue(this.savedNote());
  }

  save(): void {
    this.noteControl.markAsTouched();
    if (this.noteControl.invalid) return;
    this.favouritesService.setNote(this.name(), this.noteControl.value.trim());
  }
}
