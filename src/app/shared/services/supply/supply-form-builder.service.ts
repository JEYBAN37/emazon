import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SupplyFormBuilderService {

  constructor(private formBuilder: FormBuilder) {}

  initSupplyForm(): FormGroup {
    return this.formBuilder.group({
      idArticle: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      quantity: ['', Validators.required,, Validators.pattern('^[0-9]*$')],
      state: ['', Validators.required]
    });
  }
}
