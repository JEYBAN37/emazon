import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserLoginFormBuilderService {

  constructor(private formBuilder: FormBuilder) {}
  inicialUserLoginForm():FormGroup {
    return this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }
}
