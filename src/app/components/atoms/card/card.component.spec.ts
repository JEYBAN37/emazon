import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create the card component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the card title correctly', () => {
    component.title = 'Test Card Title';
    fixture.detectChanges(); // Update the template
    const titleElement = fixture.debugElement.query(By.css('h3')); // Assuming an <h3> is used for the title
    expect(titleElement.nativeElement.textContent).toContain('Test Card Title');
  });

  it('should render the card content correctly', () => {
    component.content = 'Test Card Content';
    fixture.detectChanges(); // Update the template
    const contentElement = fixture.debugElement.query(By.css('.card-content')); // Assuming a class is used for content
    expect(contentElement.nativeElement.textContent).toContain('Test Card Content');
  });

  it('should display the image when imageUrl is provided', () => {
    component.imageUrl = 'http://example.com/image.jpg';
    fixture.detectChanges(); // Update the template
    const imgElement = fixture.debugElement.query(By.css('img')); // Assuming an <img> element is used
    expect(imgElement.nativeElement.src).toContain('http://example.com/image.jpg');
  });

  it('should render the button with the correct text', () => {
    component.buttonText = 'Test Button';
    fixture.detectChanges(); // Update the template
    const buttonElement = fixture.debugElement.query(By.css('button')); // Assuming a <button> element is used
    expect(buttonElement.nativeElement.textContent).toContain('Test Button');
  });
});
