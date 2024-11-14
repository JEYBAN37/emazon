import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';


import { CardArticleComponent } from './card-article.component';
import { ArticleService } from 'src/app/shared/services/articles/article.service';
import { ArticleFormBuilderService } from 'src/app/shared/services/articles/article-form-builder.service';
import { Article } from 'src/app/shared/models/article-interface';



describe('CardArticleComponent', () => {
  let component: CardArticleComponent;
  let fixture: ComponentFixture<CardArticleComponent>;
  let validationService: ValidationService;
  let articleService: ArticleService;
  let alertMessageService: AlertMessageService;
  let ArticleFormBuilder: ArticleFormBuilderService;

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
        brand: new FormControl(0),
        articleCategories:new FormControl([]),
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
    ArticleFormBuilder = TestBed.inject(ArticleFormBuilderService);

    fixture.detectChanges();
  });

  const mockArticle: Article = {
    name: 'Test Article',
    description: 'Test Description',
    quantity: 1,
    price: 1,
    brand: 1,
    articleCategories: [1]
  };

  const mockArticleEmty: Article = {
    name: null,
    description: null,
    quantity: null,
    price: null,
    brand: null,
    articleCategories: null
  };

  it('should call ArticleService.fetchArticleData and alertService.showSuccess when form is valid', () => {

    const fetchArticleDataSpy = jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(of(mockArticle));
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(alertMessageService.showSuccess('Categoria creada exitosamente'));;

    // Set form values to valid data
    component.articleForm.controls['name'].setValue('Test Article');
    component.articleForm.controls['description'].setValue('Test Description');
    component.articleForm.controls['quantity'].setValue(1);
    component.articleForm.controls['price'].setValue(1);
    component.articleForm.controls['brand'].setValue(1);
    component.articleForm.controls['articleCategories'].setValue([1]);
    component.getData();

    expect(fetchArticleDataSpy).toHaveBeenCalledWith(mockArticle);
    expect(showSuccessSpy).toHaveBeenCalledWith('Categoria creada exitosamente');
  });



  it('should call alertService.showError when ArticleService.fetchArticleData fails', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchArticleDataSpy = jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Test Error'));

    component.articleForm.controls['name'].setValue('Test Article');
    component.articleForm.controls['description'].setValue('Test Description');
    component.articleForm.controls['quantity'].setValue(1);
    component.articleForm.controls['price'].setValue(1);
    component.articleForm.controls['brand'].setValue(1);
    component.articleForm.controls['articleCategories'].setValue([1]);
    component.getData();

    expect(fetchArticleDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });

  it('should show success message on successful form submission', () => {

    // Set valid form data
    component.articleForm.setValue({
      name: 'Test Article',
      description: 'Test Description',
      quantity:1,
      price: 1,
      brand: 1,
      articleCategories: [1]
    });

    // Mock alertMessageService
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(alertMessageService.showSuccess('Articulo creado exitosamente'));
    
    // Mock the response from ArticleService
    jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(of(mockArticle));

    component.getData();

    expect(showSuccessSpy).toHaveBeenCalledWith('Articulo creado exitosamente');
  });

  it('should show error message on failed form submission', () => {
    // Set valid form data
    component.articleForm.setValue({
      name: 'Test Article',
      description: 'Test Description',
      quantity:1,
      price: 1,
      brand: 1,
      articleCategories: [1]
    });

    // Mock alertMessageService
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Error occurred'));

    // Mock the error response from ArticleService
    jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(throwError({ error: { message: 'Error occurred' } }));

    component.getData();

    expect(showErrorSpy).toHaveBeenCalledWith('Error occurred');
  });

  it('should emit refresGet event after successful form submission', () => {
    // Set valid form data
    component.articleForm.setValue({
      name: 'Test Article',
      description: 'Test Description',
      quantity:1,
      price: 1,
      brand: 1,
      articleCategories: [1]
    });

    // Spy on refresGet emit
    const emitSpy = jest.spyOn(component.refresGet, 'emit');

    // Mock the response from ArticleService
    jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(of(mockArticle));

    component.getData();

    expect(emitSpy).toHaveBeenCalled();
  });


  it('should not call markFormGroupTouched if the form is valid', () => {
    // Set the form to a valid state
    component.articleForm.setValue({
      name: 'Valid Article',
      description: 'Valid Description',
      quantity:1,
      price: 1,
      brand: 1,
      articleCategories: [1]
    });

    // Mock the fetchArticleData to return an observable (mock success response)
    jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(of(mockArticle));

    // Spy on markFormGroupTouched
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Call getData()
    component.getData();

    // Ensure markFormGroupTouched is NOT called
    expect(markFormGroupTouchedSpy).not.toHaveBeenCalled();
  });
  
  it('should call markFormGroupTouched if the form is invalid', () => {
    // Set the form to be invalid
    component.articleForm.setValue({
      name: null, // Invalid value
      description:null,// Invalid value,
      quantity:null,
      price: null,
      brand: null,
      articleCategories:null
    });

    // Spy on markFormGroupTouched to check if it's called
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Mock the fetchArticleData method to return an observable
    jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(of(mockArticleEmty));
    validationService.markFormGroupTouched(component.articleForm);
    validationService.markFormGroupTouched(component.articleForm);

    // Call the method that triggers the validation and fetch
    component.getData();

    
    // Optionally, check if the service was called (if needed)
    expect(articleService.fetchArticleData).toHaveBeenCalledWith(component.articleForm.value);
  });


  it('should call articleService.fetchArticleData and alertService.showSuccess on successful form submission', () => {
    // Set the form to a valid state
    component.articleForm.setValue({
      name: 'Valid Article',
      description: 'Valid Description',
      quantity: 1,
      price: 1,
      brand: 1,
      articleCategories: [1]
    });

    // Mock the fetchArticleData to return an observable (mock success response)
    const fetchArticleDataSpy = jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(of(mockArticle));
    const showSuccessSpy = jest.spyOn(alertMessageService, 'showSuccess').mockReturnValue(
      alertMessageService.showSuccess('Articulo creado exitosamente'));

    // Call getData()
    component.getData();

    // Ensure fetchArticleData and showSuccess are called
    expect(showSuccessSpy).toHaveBeenCalledWith('Articulo creado exitosamente');
  });

  it('should call alertService.showError on failed form submission', () => {
    // Set the form to a valid state
    component.articleForm.setValue({
      name: 'Valid Article',
      description: 'Valid Description',
      quantity: 1,
      price: 1,
      brand: 1,
      articleCategories: [1]
    });

    // Mock the fetchArticleData to return an observable (mock error response)
    const mockError = { error: { message: 'Hubo un error al enviar' } };
    const fetchArticleDataSpy = jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Hubo un error al enviar'));

    // Call getData()
    component.getData();

    // Ensure fetchArticleData and showError are called
    expect(fetchArticleDataSpy).toHaveBeenCalledWith(component.articleForm.value);
    expect(showErrorSpy).toHaveBeenCalledWith('Hubo un error al enviar');
  });

  it('should emit refresGet event after successful form submission', () => {
    // Set the form to a valid state
    component.articleForm.setValue({
      name: 'Valid Article',
      description: 'Valid Description',
      quantity: 1,
      price: 1,
      brand: 1,
      articleCategories: [1]
    });

    // Spy on refresGet emit
    const emitSpy = jest.spyOn(component.refresGet, 'emit');

    // Mock the fetchArticleData to return an observable (mock success response)
    jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(of(mockArticle));

    // Call getData()
    component.getData();

    // Ensure refresGet emit is called
    expect(emitSpy).toHaveBeenCalled();
  });

  it('debería llamar a markFormGroupTouched si el formulario es inválido vfd', () => {
    // Marcar el formulario como inválido
    component.articleForm.get('name')?.setErrors({ required: true });
    // Espiar la función markFormGroupTouched
    const markFormGroupTouchedSpy = jest.spyOn(validationService, 'markFormGroupTouched');

    // Llamar al método getData, que debería disparar la validación
    component.getData();

    // Verificar que markFormGroupTouched se haya llamado
    expect(markFormGroupTouchedSpy).toHaveBeenCalledWith(component.articleForm);
  });

  it('should call alertService.showError with default message when error object does not contain a message', () => {
    const mockError = { error: {} };
    const fetchUserAuxDataSpy = jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Hubo un error al enviar'));

    component.articleForm.controls['name'].setValue('Test Article');
    component.articleForm.controls['description'].setValue('Test Description');
    component.articleForm.controls['quantity'].setValue(1);
    component.articleForm.controls['price'].setValue(1);
    component.articleForm.controls['brand'].setValue(1);
    component.articleForm.controls['articleCategories'].setValue([1]);
    component.getData();

    expect(fetchUserAuxDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Hubo un error al enviar');
  });

 
  it('should call alertService.showError with specific message when error object contains a message', () => {
    const mockError = { error: { message: 'Test Error' } };
    const fetchUserAuxDataSpy = jest.spyOn(articleService, 'fetchArticleData').mockReturnValue(throwError(mockError));
    const showErrorSpy = jest.spyOn(alertMessageService, 'showError').mockReturnValue(alertMessageService.showError('Test Error'));

    component.articleForm.controls['name'].setValue('Test Article');
    component.articleForm.controls['description'].setValue('Test Description');
    component.articleForm.controls['quantity'].setValue(1);
    component.articleForm.controls['price'].setValue(1);
    component.articleForm.controls['brand'].setValue(1);
    component.articleForm.controls['articleCategories'].setValue([1]);
    component.getData();

    expect(fetchUserAuxDataSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith('Test Error');
  });

}); 
 