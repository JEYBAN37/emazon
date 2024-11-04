import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})
export class CardCategoryComponent implements OnInit {
  public categoryForm!: FormGroup;

  constructor(private fromBuilder: FormBuilder) {
    // Inicializar el formulario
    this.categoryForm = this.fromBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]]
    });
  }

  ngOnInit(): void {}

  send() {
    if (this.categoryForm.invalid) {
      // Mark all controls as touched to show validation messages
      this.categoryForm.markAllAsTouched();
      return;
    }

    
    // If form is valid, proceed with form submission logic
    console.log('Form submitted:', this.categoryForm.value);
  }

  nameControl(variable:string): FormControl {
    return this.categoryForm.get(variable) as FormControl;
  }

}