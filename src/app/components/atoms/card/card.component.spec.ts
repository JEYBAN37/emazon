import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleElement.textContent).toContain('Título de la Tarjeta');
  });

  it('should display the default content', () => {
    const contentElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(contentElement.textContent).toContain('Contenido de la tarjeta. Aquí puedes agregar cualquier información adicional.');
  });

  it('should display the input title when provided', () => {
    component.title = 'Nuevo Título';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleElement.textContent).toContain('Nuevo Título');
  });

  it('should display the input content when provided', () => {
    component.content = 'Nuevo contenido de la tarjeta';
    fixture.detectChanges();
    const contentElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(contentElement.textContent).toContain('Nuevo contenido de la tarjeta');
  });

  it('should display the input image URL when provided', () => {
    component.imageUrl = 'https://via.placeholder.com/150';
    fixture.detectChanges();
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain('https://via.placeholder.com/150');
  });

  it('should display the input button text when provided', () => {
    component.buttonText = 'Nuevo Botón';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent).toContain('Nuevo Botón');
  });
});
