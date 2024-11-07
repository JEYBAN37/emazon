import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelComponent } from './label.component';
import { By } from '@angular/platform-browser';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
  });

  it('should create the Label component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input properties', () => {
    expect(component.forId).toBe('');
    expect(component.label).toBe('');
  });

  it('should render the label text', () => {
    component.label = 'Test Label';
    fixture.detectChanges(); // Trigger change detection
    const labelElement = fixture.debugElement.query(By.css('label'));
  
    // Usa trim() para eliminar espacios en blanco alrededor del texto
    expect(labelElement.nativeElement.textContent.trim()).toBe('Test Label');
  });
  

  it('should associate the label with the input by forId', () => {
    component.forId = 'testId';
    fixture.detectChanges(); // Trigger change detection
    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement.nativeElement.getAttribute('for')).toBe('testId');
  });
});
