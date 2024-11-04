import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectServiceInterface } from 'src/app/shared/services/stock-service-interface';

@Component({
  selector: 'app-card-brand',
  templateUrl: './card-brand.component.html',
  styleUrls: ['./card-brand.component.scss']
})
export class CardBrandComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showSuccess: boolean = false;
  showError: boolean = false;

  @Input() service!: ObjectServiceInterface; 

  public brandForm !: FormGroup

  constructor(private fromBuilder : FormBuilder){
    this.brandForm = this.fromBuilder.group({
      name:['',[Validators.required, Validators.maxLength(50)]],
      description:['',[Validators.required, Validators.maxLength(90)]]
    })
  }

  ngOnInit(): void {
  }

  send() {
    if (this.brandForm.invalid) {
      this.brandForm.markAllAsTouched();
      return;
    }

    const objectStock = this.brandForm.value;
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
  
  nameControl(variable : string): FormControl {
    return this.brandForm.get(variable) as FormControl;
  }
}
