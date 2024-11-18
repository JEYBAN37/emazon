import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterFormBuilderService {
  constructor(private formBuilder: FormBuilder) { }
  initUserForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(90)]],
      dni: ['', [Validators.required, Validators.maxLength(18)]],
      telephone: ['', [Validators.required, Validators.maxLength(13)]],
      dateAge: ['', [Validators.required]],
      email:  ['', [Validators.required]],
      password:  ['', [Validators.required]],
    });
  }
}
