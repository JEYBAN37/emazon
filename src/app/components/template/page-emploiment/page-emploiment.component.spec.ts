import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEmploimentComponent } from './page-emploiment.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PageEmploimentComponent', () => {
  let component: PageEmploimentComponent;
  let fixture: ComponentFixture<PageEmploimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageEmploimentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageEmploimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct menuLinks property', () => {
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
