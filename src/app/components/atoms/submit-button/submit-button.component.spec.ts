import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitButtonComponent } from './submit-button.component';
import { By } from '@angular/platform-browser';

describe('SubmitButtonComponent', () => {
  let component: SubmitButtonComponent;
  let fixture: ComponentFixture<SubmitButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default label as "Enviar"', () => {
    expect(component.label).toBe('Enviar');
  });

  it('should have default disabled as false', () => {
    expect(component.disabled).toBe(false);
  });

  it('should display the label text', () => {
    component.label = 'Submit';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent.trim()).toBe('Submit');
  });

  it('should disable the button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.disabled).toBe(true);
  });

  it('should emit action event when button is clicked', () => {
    const actionSpy = jest.spyOn(component.action, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    
    buttonElement.click();
    expect(actionSpy).toHaveBeenCalled();
  });
});
