import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectServiceInterface, ObjectStock } from 'src/app/shared/services/stock-service-interface';

@Component({
  selector: 'app-card-user-aux',
  templateUrl: './card-user-aux.component.html',
  styleUrls: ['./card-user-aux.component.scss']
})
export class CardUserAuxComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showSuccess: boolean = false;
  showError: boolean = false;
  public userAuxForm !: FormGroup
  @Input() service!: ObjectServiceInterface; 
  constructor(private fromBuilder : FormBuilder) {
    this.userAuxForm = this.fromBuilder.group({
      name:['',[Validators.required, Validators.maxLength(50)]],
      lastName:['',[Validators.required, Validators.maxLength(90)]],
      dni:['',Validators.required,Validators.maxLength(18)],
      telephone:['',Validators.required,Validators.maxLength(13)],
      dateAge:['',Validators.required,this.dateValidator],
      email:['',Validators.required,Validators.email],
      password:['',Validators.required,Validators.minLength(6),Validators.maxLength(50)]
    })
   }

  ngOnInit(): void {
  }

  private dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    // Check if the value is a valid date
    const dateValue = new Date(control.value);
    if (isNaN(dateValue.getTime())) {
      return { invalidDate: true }; // return error if invalid
    }
    return null; // return null if valid
  }

  send(){
    if (this.userAuxForm.invalid) {
      // Mark all controls as touched to show validation messages
      this.userAuxForm.markAllAsTouched();
      return;
    }

    const objectStock:ObjectStock = {
      name: this.userAuxForm.value.name,
      lastName: this.userAuxForm.value.lastName,
      dni: this.userAuxForm.value.dni,
      telephone : this.userAuxForm.value.telephone,
      dateAge : this.userAuxForm.value.dateAge,
      email: this.userAuxForm.value.email,
      password :  this.userAuxForm.value.password
    }
    console.log("Formulario enviado", objectStock); // Muestra la estructura

    this.service.create(objectStock).subscribe({
        next: (response) => {
            console.log('Respuesta del backend:', response);
            this.successMessage = "Formulario enviado exitosamente";
            this.showSuccess = true;
            this.errorMessage = null;

            setTimeout(() => {
                this.showSuccess = false;
            }, 5000);
        },
        error: (error) => {
            console.error('Error al enviar solicitud:', error);
            this.errorMessage = error.error?.message || "Hubo un error al enviar el formulario";
            this.showError = true;

            setTimeout(() => {
                this.showError = false;
            }, 5000);

            this.successMessage = null;
        }
    });
  }

  nameControl(variable:string): FormControl {
    return this.userAuxForm.get(variable) as FormControl;
  }

}
