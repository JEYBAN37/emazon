import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserLoginFormBuilderService {

  constructor(private formBuilder: FormBuilder) {}
  InicialUserLoginForm() {
    return this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }
}
