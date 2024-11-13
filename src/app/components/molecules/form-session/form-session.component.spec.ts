import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormSessionComponent } from './form-session.component';
import { AlertMessageService } from 'src/app/shared/services/alerts-services/alert-message.service';
import { UserLoginFormBuilderService } from 'src/app/shared/services/user-login/user-login-form-builder.service';
import { UserLoginService } from 'src/app/shared/services/user-login/user-login.service';
import { ValidationService } from 'src/app/shared/services/validations/validation.service';
import { of } from 'rxjs';

describe('FormSessionComponent', () => {
  let component: FormSessionComponent;
  let fixture: ComponentFixture<FormSessionComponent>;
  let routerSpy = { navigate: jest.fn() };
  let userLoginFormBuilderSpy = {
    InicialUserLoginForm: jest.fn().mockReturnValue(new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    })),
  };
  let validationServiceSpy = {
    markFormGroupTouched: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormSessionComponent],
      providers: [
        { provide: UserLoginFormBuilderService, useValue: userLoginFormBuilderSpy },
        { provide: UserLoginService, useValue: {} },
        { provide: ValidationService, useValue: validationServiceSpy },
        { provide: AlertMessageService, useValue: {} },
        { provide: ChangeDetectorRef, useValue: {} },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userForm on ngOnInit', () => {
    component.ngOnInit();
    expect(component.userForm).toBeDefined();
    expect(userLoginFormBuilderSpy.InicialUserLoginForm).toHaveBeenCalled();
  });

  it('should navigate to route when getData is called with valid form', () => {
    component.route = '/dashboard';
    component.userForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.getData();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should return form control for a given control name', () => {
    const control = component.getFormControl('email');
    expect(control).toBeInstanceOf(FormControl);
    expect(control.value).toBe('test@example.com');
  });
});
