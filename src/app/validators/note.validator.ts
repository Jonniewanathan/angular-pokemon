import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noteValidator(control: AbstractControl): ValidationErrors | null {
  const value = ((control.value as string | null) ?? '').trim();
  if (!value) return { required: true };
  if (value.length < 3) return { minlength: true };
  if (value.length > 100) return { maxlength: true };
  return null;
}
