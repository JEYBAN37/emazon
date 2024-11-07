import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ArticleFormBuilderService {
  constructor(private formBuilder: FormBuilder) {}

  initArticleForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      brand: ['', Validators.required],
      articleCategories: [[], Validators.required],
    });
  }
}
