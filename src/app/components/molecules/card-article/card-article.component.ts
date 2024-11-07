import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Article } from 'src/app/shared/models/article-interface';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { ArticleFormBuilderService } from 'src/app/shared/services/articles/article-form-builder.service';
import { ArticleService } from 'src/app/shared/services/articles/article.service';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';

@Component({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss'],
})

export class CardArticleComponent implements OnInit {
  public articleForm!: FormGroup;
  public titleArticle : string = "Crear Articulo"
  public subtitle : string = "Agrega nuevo articulo"

  categories = [
    133535
  ]

  constructor(
    public articleFormBuilder: ArticleFormBuilderService,
    public articleService: ArticleService,
    public validationService: ValidationService,
    public alertService: AlertMessageService,
    public cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.articleForm = this.articleFormBuilder.initArticleForm();
  }

  getData(): void {
    if (this.articleForm.invalid) { 
      this.validationService.markFormGroupTouched(this.articleForm);
      return;
    }

    const article: Article = {
       ...this.articleForm.value };

    this.articleService.fetchArticleData(article).subscribe({
      next: (response) => {
        this.alertService.showSuccess('Categoria creada exitosamente');
        this.articleForm.reset();
      },
      error: (error) => {
        this.alertService.showError(
          error.error?.message || 'Hubo un error al enviar'
        );
      },
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.articleForm.get(controlName) as FormControl;
  }
}
