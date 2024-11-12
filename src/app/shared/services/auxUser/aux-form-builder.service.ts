import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuxFormBuilderService {

  constructor(private formBuilder: FormBuilder) { }
  public initAuxUserForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(90)]],
      dni: ['', [Validators.required, Validators.maxLength(18)]],
      telephone: ['', [Validators.required, Validators.maxLength(13)]],
      dateAge: ['', [Validators.required]],
      email:  ['', [Validators.required,Validators.email]],
      password:  ['', [Validators.required]],
    });
  }
}
