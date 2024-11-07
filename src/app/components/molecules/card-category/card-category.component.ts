import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { CategoryFormBuilderService } from 'src/app/shared/services/category/category-form-builder.service';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Category } from 'src/app/shared/models/category-interface';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss'],
})
export class CardCategoryComponent implements OnInit {
  public categoryForm!: FormGroup;
  public title : string = "Crear Categoria"
  public subtitle : string = "Agrega nueva categoria"

  constructor(
    public validationService: ValidationService,
    public categoryFromBuilder: CategoryFormBuilderService,
    public alertService: AlertMessageService,
    public categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.categoryFromBuilder.initCategoryForm();
  }

  getData(): void {
    if (this.categoryForm.invalid) {
      this.validationService.markFormGroupTouched(this.categoryForm);
      return;
    }

    const category: Category = { ...this.categoryForm.value };
    this.categoryService.fetchCategoryData(category).subscribe({
      next: (response) => {
        this.alertService.showSuccess('Categoria creada exitosamente');
        this.categoryForm.reset();
      },
      error: (error) => {
        this.alertService.showError(
          error.error?.message || 'Hubo un error al enviar'
        );
      },
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.categoryForm.get(controlName) as FormControl;
  }
}
