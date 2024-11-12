import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  providers: [AlertMessageService]
})

export class CardArticleComponent implements OnInit {
  public articleForm!: FormGroup;
  public titleArticle : string = "Crear Articulo"
  public subtitle : string = "Agrega nuevo articulo"
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @Output() refresGet = new EventEmitter<void>();

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

   // this.scrollContainer.nativeElement.scrollTo({
    //  top: 0,
     // behavior: 'smooth' // hace el desplazamiento suave
    //});

    const article: Article = {
       ...this.articleForm.value };

    this.articleService.fetchArticleData(article).subscribe({
      next: (response) => {
        this.alertService.showSuccess('Articulo creado exitosamente');
        this.refresGet.emit(); 
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
