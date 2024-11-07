import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardArticleComponent } from './card-article.component';
import { of, throwError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ArticleService } from 'src/app/shared/services/articles/article.service';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { ArticleFormBuilderService } from 'src/app/shared/services/articles/article-form-builder.service';
import { Article } from 'src/app/shared/models/article-interface';

describe('CardArticleComponent', () => {
  let component: CardArticleComponent;
  let fixture: ComponentFixture<CardArticleComponent>;
  let validationService: ValidationService;
  let articleService: ArticleService;
  let alertMessageService: AlertMessageService;
  let articleFormBuilder: ArticleFormBuilderService;

  beforeEach(() => {
    const mockArticleService = {
      fetchArticleData: jest.fn()
    };

    const mockValidationService = {
      markFormGroupTouched: jest.fn()
    };

    const mockAlertMessageService = {
      showSuccess: jest.fn(),
      showError: jest.fn()
    };

    const mockArticleFormBuilderService = {
      initArticleForm: jest.fn(() => new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        quantity: new FormControl(0),
        price: new FormControl(0),
        brand: new FormControl(''),
        articleCategories: new FormControl(['133535']),
      }))
    };

    TestBed.configureTestingModule({
      declarations: [CardArticleComponent],
      providers: [
        { provide: ArticleService, useValue: mockArticleService },
        { provide: ValidationService, useValue: mockValidationService },
        { provide: AlertMessageService, useValue: mockAlertMessageService },
        { provide: ArticleFormBuilderService, useValue: mockArticleFormBuilderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardArticleComponent);
    component = fixture.componentInstance;
    validationService = TestBed.inject(ValidationService);
    articleService = TestBed.inject(ArticleService);
    alertMessageService = TestBed.inject(AlertMessageService);
    articleFormBuilder = TestBed.inject(ArticleFormBuilderService);

    fixture.detectChanges();
  });


  it('should call articleService.fetchArticleData and alertService.showSuccess when form is valid', () => {
    const mockArticle: Article = {
      name: 'Test Article',
      description: 'Test Description',
      quantity: 10,
      price: 100,
      brand: 'Brand A',
      articleCategories: ['133535']
    };

    const fetchArticleDataSpy = jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(of(mockArticle));
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess');

    // Set form values to valid data
    component.articleForm.controls['name'].setValue('Test Article');
    component.articleForm.controls['description'].setValue('Test Description');
    component.articleForm.controls['quantity'].setValue(10);
    component.articleForm.controls['price'].setValue(100);
    component.articleForm.controls['brand'].setValue('Brand A');
    component.articleForm.controls['articleCategories'].setValue(['133535']);

    component.getData();

    expect(fetchArticleDataSpy).toHaveBeenCalledWith(mockArticle);
    expect(showSuccessSpy).toHaveBeenCalledWith('Formulario enviado exitosamente');
  });

  it('should call alertService.showError when articleService.fetchArticleData fails', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchArticleDataSpy = jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError');

    component.articleForm.controls['name'].setValue('Test Article');
    component.articleForm.controls['description'].setValue('Test Description');
    component.articleForm.controls['quantity'].setValue(10);
    component.articleForm.controls['price'].setValue(100);
    component.articleForm.controls['brand'].setValue('Brand A');
    component.articleForm.controls['articleCategories'].setValue(['133535']);

    component.getData();

    expect(fetchArticleDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });
});
