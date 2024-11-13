import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

class RouterMock {
  navigate = jest.fn();
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let routerMock: RouterMock;

  beforeEach(async () => {
    routerMock = new RouterMock();

    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      providers: [
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // to ignore template errors caused by child components
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit and renders the component
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component with default values', () => {
    expect(component.title).toBe('¿Quieres Iniciar Sesion?');
    expect(component.subtitle).toBe('Selecciona el tipo de usuario en Emazon');
    expect(component.userSelected).toBe('Selecciona tu usuario');
    expect(component.employee).toBe('Empleado');
    expect(component.client).toBe('Cliente');
    expect(component.admin).toBe('Admin');
  });

  describe('selectUser', () => {
    it('should select a user type', () => {
      const userType = 'Cliente';
      component.selectUser(userType);
      expect(component.selectedUser).toBe(userType);
    });
  });

  describe('toRegister', () => {
    it('should navigate to the register page', () => {
      component.toRegister();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/register']);
    });
  });
});
