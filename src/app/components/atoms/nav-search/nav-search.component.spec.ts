// nav-search.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavSearchComponent } from './nav-search.component';
import { By } from '@angular/platform-browser';

describe('NavSearchComponent', () => {
  let component: NavSearchComponent;
  let fixture: ComponentFixture<NavSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSearchComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchEvent with correct value when onSearch is called', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    const testValue = 'Test Search';
    let emittedValue: string | undefined;

    // Subscribirse al evento y asignar el valor emitido
    component.searchEvent.subscribe((value) => {
      emittedValue = value;
    });

    // Simula el valor de entrada y la llamada a onSearch
    inputElement.nativeElement.value = testValue;
    inputElement.nativeElement.dispatchEvent(new Event('input'));

    // Verifica que se emitió el valor correcto
    expect(emittedValue).toBe(testValue);
  });
});
