import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTypeSelectionComponentComponent } from './user-type-selection-component.component';

describe('UserTypeSelectionComponentComponent', () => {
  let component: UserTypeSelectionComponentComponent;
  let fixture: ComponentFixture<UserTypeSelectionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTypeSelectionComponentComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeSelectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedType to null', () => {
    expect(component.selectedType).toBeNull();
  });

  it('should have a predefined list of userTypes', () => {
    expect(component.userTypes).toEqual([
      { id: 'cliente', name: 'Cliente', icon: 'user', description: 'Acceso a servicios y productos' },
      { id: 'auxiliar', name: 'Auxiliar', icon: 'user-cog', description: 'Asistencia y soporte técnico' },
      { id: 'administrador', name: 'Administrador', icon: 'shield', description: 'Control total del sistema' }
    ]);
  });

  it('should log selected user type when handleSubmit is called with a selectedType', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.selectedType = 'cliente';

    const event = new Event('submit');
    component.handleSubmit(event);

    expect(consoleSpy).toHaveBeenCalledWith('Tipo de usuario seleccionado: cliente');
    consoleSpy.mockRestore();
  });

  it('should not log anything if handleSubmit is called without a selectedType', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.selectedType = null;

    const event = new Event('submit');
    component.handleSubmit(event);

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
