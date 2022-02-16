import { Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CityValidator implements AsyncValidator {
  constructor() {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (['tvm', 'ekm'].includes(control?.value)) {
          resolve(null);
        } else {
          resolve({
            invalidCity: true,
          });
        }
      }, 2000);
    });
  }
}
