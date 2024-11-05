import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OBJECT_SERVICE, ObjectServiceInterface, ObjectStock } from 'src/app/shared/services/stock-service-interface';

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
  objectStock!: ObjectStock;
  public brandForm !: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    //@Inject(OBJECT_SERVICE) private objectService: ObjectServiceInterface 
  ) {}
  
    ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.brandForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]]
    });
  }


  send() {
    if (this.brandForm.invalid) {
      this.brandForm.markAllAsTouched();
      return;
    }

    const objectStock = this.brandForm.value;


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
    this.errorMessage = error.error?.message || "Hubo un error al enviar";
    this.showError = true;
    this.successMessage = null;

    this.cdr.detectChanges();

    setTimeout(() => {
      this.showError = false;
      this.cdr.detectChanges();
    }, 2000);
  }


  nameControl(variable : string): FormControl {
    return this.brandForm.get(variable) as FormControl;
  }
}
