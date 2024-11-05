import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OBJECT_SERVICE, ObjectServiceInterface, ObjectStock } from 'src/app/shared/services/stock-service-interface';

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
  public articleForm!: FormGroup;

  categories = [
    133535
  ]

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    //@Inject(OBJECT_SERVICE) private objectService: ObjectServiceInterface // Usar el token aquí
  ) {}


  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.articleForm = this.formBuilder.group({
      name:['',[Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]],
      quantity:['',Validators.required],
      price:['',Validators.required],
      brand:['',Validators.required],
      articleCategories:[[],Validators.required]
    });
  }

  send() {
    if (this.articleForm.invalid) {
        this.articleForm.markAllAsTouched();
        return;
    }

    const objectStock: ObjectStock = {
        name: this.articleForm.value.name,
        description: this.articleForm.value.description,
        quantity: this.articleForm.value.quantity,
        price: this.articleForm.value.price,
        brand: this.articleForm.value.brand,
        articleCategories: this.articleForm.value.articleCategories || [] // Esto asegurará que sea un array
    };

    this.service.create(objectStock).subscribe({
      next: (response) => this.handleSuccess(response),
      error: (error) => this.handleError(error)
    });
}

public handleSuccess(response: any) {
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

public handleError(error: any) {
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

  nameControl(variable:string): FormControl {
    return this.articleForm.get(variable) as FormControl;
  }
}
