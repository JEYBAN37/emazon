import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectServiceInterface, ObjectStock } from 'src/app/shared/services/stock-service-interface';

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
  objectStock !: ObjectStock
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
      this.categoryForm.markAllAsTouched();
      return;
    }

    const objectStock = this.categoryForm.value;
    console.log("Formulario enviado");

    this.service.create(objectStock).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        this.successMessage = "Formulario enviado exitosamente";
        this.showSuccess = true; // Muestra el mensaje de éxito
        this.errorMessage = null;

        // Desaparece el mensaje después de 5 segundos
        setTimeout(() => {
          this.showSuccess = false;
        }, 5000);
      },
      error: (error) => {
        console.error('Error al enviar solicitud:', error);
        
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = "Hubo un error al enviar el formulario";
        }
        this.showError = true; // Muestra el mensaje de error

        // Desaparece el mensaje después de 5 segundos
        setTimeout(() => {
          this.showError = false;
        }, 5000);
        
        this.successMessage = null;
      }
    });
  }

  nameControl(variable:string): FormControl {
    return this.categoryForm.get(variable) as FormControl;
  }

}
