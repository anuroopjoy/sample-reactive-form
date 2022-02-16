import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const notNumber = parseInt(control.value) != control.value;
    return notNumber ? { notNumeric: { value: control.value } } : null;
  };
}
