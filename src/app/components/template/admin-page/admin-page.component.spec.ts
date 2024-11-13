import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPageComponent } from './admin-page.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct menuLinks property', () => {
    expect(component.menuLinks).toEqual([
      { route: '/productos', name: 'Estadísticas' },
      { route: '/servicios', name: 'Perfil' },
      { route: '/', name: 'Cerrar Sesión' },
    ]);
  });



  it('should initialize menuLinks correctly on ngOnInit', () => {
    // Verify that the menuLinks property is set correctly after ngOnInit is called
    component.ngOnInit();
    expect(component.menuLinks).toEqual([
      { route: '/productos', name: 'Estadísticas' },
      { route: '/servicios', name: 'Perfil' },
      { route: '/', name: 'Cerrar Sesión' },
    ]);
  });
});
