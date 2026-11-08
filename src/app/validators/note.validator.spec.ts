import { FormControl } from '@angular/forms';
import { noteValidator } from './note.validator';

describe('noteValidator', () => {
  it.each(['', '   '])('requires a value (%j)', (value) => {
    expect(noteValidator(new FormControl(value))).toEqual({ required: true });
  });

  it('rejects notes under 3 characters', () => {
    expect(noteValidator(new FormControl('ab'))).toEqual({ minlength: true });
  });

  it('measures the length after trimming', () => {
    expect(noteValidator(new FormControl('  a  '))).toEqual({ minlength: true });
  });

  it('rejects notes over 100 characters', () => {
    expect(noteValidator(new FormControl('a'.repeat(101)))).toEqual({ maxlength: true });
  });

  it('accepts a valid note', () => {
    expect(noteValidator(new FormControl('abc'))).toBeNull();
    expect(noteValidator(new FormControl('a'.repeat(100)))).toBeNull();
  });
});
