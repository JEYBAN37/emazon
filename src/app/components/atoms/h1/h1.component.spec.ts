import { ComponentFixture, TestBed } from '@angular/core/testing';
import { H1Component } from './h1.component';
import { By } from '@angular/platform-browser';

describe('H1Component', () => {
  let component: H1Component;
  let fixture: ComponentFixture<H1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [H1Component]
    }).compileComponents();

    fixture = TestBed.createComponent(H1Component);
    component = fixture.componentInstance;
  });

  it('should create the H1 component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.text).toBe('Default Heading');
    expect(component.color).toBe('#000');
    expect(component.size).toBe('large');
  });

  it('should render the heading text correctly', () => {
    component.text = 'Test Heading';
    fixture.detectChanges(); // Update the template
    const headingElement = fixture.debugElement.query(By.css('h1')); // Assuming an <h1> is used
    expect(headingElement.nativeElement.textContent).toContain('Test Heading');
  });

  it('should apply the correct text color', () => {
    component.color = '#ff0000'; // Red
    fixture.detectChanges(); // Update the template
    const headingElement = fixture.debugElement.query(By.css('h1'));
    expect(headingElement.nativeElement.style.color).toBe('rgb(255, 0, 0)'); // RGB value of red
  });

  it('should apply the correct size class', () => {
    component.size = 'small';
    fixture.detectChanges(); // Update the template
    const headingElement = fixture.debugElement.query(By.css('h1'));
    expect(headingElement.classes['small']).toBeFalsy(); // Assuming you have a class for 'small' defined in your styles
    // Check if the class for medium or large is not applied
    expect(headingElement.classes['medium']).toBeFalsy();
    expect(headingElement.classes['large']).toBeFalsy();
  });
});
