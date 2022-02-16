import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CityValidator } from '../validators/city.async.validator';
import { locationAgeValidator } from '../validators/location-age.validator';
import { numericValidator } from '../validators/numeric.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  // name = new FormControl('');
  // personalForm = new FormGroup({
  //   name: new FormControl(''),
  //   age: new FormControl(''),
  //   email: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl(''),
  //   }),
  //   hobbies: new FormArray([]),
  // });
  personalForm!: FormGroup;
  get hobbies() {
    return this.personalForm.get('hobbies') as FormArray;
  }

  constructor(private fb: FormBuilder, private cityValidator: CityValidator) {}

  ngOnInit(): void {
    this.personalForm = this.fb.group(
      {
        name: ['', Validators.required],
        age: ['', [numericValidator(), Validators.max(100), Validators.min(0)]],
        email: ['', [Validators.required, Validators.email]],
        address: this.fb.group({
          street: '',
          city: [
            '',
            {
              // updateOn: 'submit',
              updateOn: 'blur',
              asyncValidators: [
                this.cityValidator.validate.bind(this.cityValidator),
              ],
            },
          ],
          state: '',
          zip: '',
        }),
        hobbies: this.fb.array([]),
      },
      { validators: locationAgeValidator }
    );
  }

  setValue() {
    // this.name.setValue('new value');
    this.personalForm.setValue({
      name: 'new value',
      age: '10',
      email: 'test@xyz.com',
      address: {
        street: 'fdfdsfs',
        city: 'tvm',
        state: 'kerala',
        zip: '234434',
      },
      hobbies: this.hobbies.value,
    });
    // this.personalForm.get(['address', 'city'])?.markAsDirty();
    // setTimeout(() => {
    //   this.personalForm.get(['address', 'city'])?.markAsPristine();
    // }, 2000);
    // this.personalForm.get(['address', 'city'])?.markAsTouched();
    // setTimeout(() => {
    //   this.personalForm.get(['address', 'city'])?.markAsUntouched();
    // }, 2000);
    // this.personalForm.get(['address'])?.markAllAsTouched();
  }
  patchValue() {
    this.personalForm.patchValue({
      name: 'patched value',
      address: {
        city: 'ktm',
      },
    });
  }

  submitForm() {
    if (this.personalForm.valid) {
      console.log(this.personalForm.value);
      this.personalForm.markAsPristine();
      this.personalForm.markAsUntouched();
    } else {
      if (this.personalForm.hasError('locationAge')) {
        const errors = this.personalForm.getError('locationAge');
        console.log(errors);
        alert(
          `The age should be between 17 and 100 for the state of Kerala. Entered age is ${errors.age}`
        );
      }
    }
  }

  resetForm() {
    this.personalForm.reset();
  }

  addHobby() {
    this.hobbies.push(new FormControl(''));
  }

  getControl(controlName: string): FormControl {
    return this.personalForm.get(controlName) as FormControl;
  }
}
