import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageStoreComponent } from './page-store.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PageStoreComponent', () => {
  let component: PageStoreComponent;
  let fixture: ComponentFixture<PageStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct menuLinks property', () => {
    expect(component.menuLinks).toEqual([
      { route: '/car', name: 'Carrito' },
      { route: '/servicios', name: 'Perfil' },
      { route: '/', name: 'Cerrar Sesión' },
    ]);
  });

  it('should initialize menuLinks correctly on ngOnInit', () => {
    // Verify that the menuLinks property is set correctly after ngOnInit is called
    component.ngOnInit();
    expect(component.menuLinks).toEqual([
      { route: '/car', name: 'Carrito' },
      { route: '/servicios', name: 'Perfil' },
      { route: '/', name: 'Cerrar Sesión' },
    ]);
  });
});
