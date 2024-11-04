import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ObjectServiceInterface, ObjectStock } from 'src/app/shared/services/stock-service-interface';

@Component({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss']
})
export class CardArticleComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showSuccess: boolean = false;
  showError: boolean = false;
  @Input() service!: ObjectServiceInterface; 
  objectStock !: ObjectStock

  categories = [
    133535
  ]

  public articleForm !: FormGroup
  constructor(private fromBuilder : FormBuilder) {
    this.articleForm = this.fromBuilder.group({
      name:['',[Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]],
      quantity:['',Validators.required],
      price:['',Validators.required],
      brand:['',Validators.required],
      articleCategories:[[],Validators.required]
    })

   }
  ngOnInit(): void {}

  send() {
    if (this.articleForm.invalid) {
        this.articleForm.markAllAsTouched();
        return;
    }

    // Crear un objeto con los datos del formulario
    const objectStock: ObjectStock = {
        name: this.articleForm.value.name,
        description: this.articleForm.value.description,
        quantity: this.articleForm.value.quantity,
        price: this.articleForm.value.price,
        brand: this.articleForm.value.brand,
        // Asegúrate de que articleCategories sea un array
        articleCategories: this.articleForm.value.articleCategories || [] // Esto asegurará que sea un array
    };

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
    return this.articleForm.get(variable) as FormControl;
  }

}
