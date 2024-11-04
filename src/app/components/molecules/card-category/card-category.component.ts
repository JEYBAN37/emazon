import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ChangeDetectorRef } from '@angular/core';
import { OBJECT_SERVICE, ObjectServiceInterface, ObjectStock } from 'src/app/shared/services/stock-service-interface';


@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})
export class CardCategoryComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showSuccess: boolean = false;
  showError: boolean = false;

  @Input() service!: ObjectServiceInterface; 
  objectStock!: ObjectStock;
  public categoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject(OBJECT_SERVICE) private objectService: ObjectServiceInterface // Usar el token aquí
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]]
    });
  }

  send() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const objectStock = this.categoryForm.value;


    this.service.create(objectStock).subscribe({
      next: (response) => this.handleSuccess(response),
      error: (error) => this.handleError(error)
    });
  }

  private handleSuccess(response: any) {
    console.log('Respuesta del backend:', response);
    this.successMessage = "Formulario enviado exitosamente";
    this.showSuccess = true;
    this.errorMessage = null;

    this.cdr.detectChanges(); // Actualiza la vista

    setTimeout(() => {
      this.showSuccess = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  private handleError(error: any) {
    console.error('Error al enviar solicitud:', error);
    
    this.errorMessage = error.error?.message || "Hubo un error al enviar";
    this.showError = true;
    this.successMessage = null;

    this.cdr.detectChanges();

    setTimeout(() => {
      this.showError = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  getFormControl(controlName: string): FormControl {
    return this.categoryForm.get(controlName) as FormControl;
  }
}
