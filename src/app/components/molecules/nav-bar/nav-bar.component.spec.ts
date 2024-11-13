import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { By } from '@angular/platform-browser';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with menu closed', () => {
    expect(component.isMenuOpen).toBe(false);
  });

  it('should toggle menu open state when toggleMenu is called', () => {
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(true);
    component.toggleMenu();
    expect(component.isMenuOpen).toBe(false);
  });

  it('should receive navLinks input', () => {
    const mockLinks = [
      { route: '/home', name: 'Home' },
      { route: '/about', name: 'About' },
    ];
    component.navLinks = mockLinks;
    fixture.detectChanges();

    expect(component.navLinks).toEqual(mockLinks);
  });

  it('should render nav links', () => {
    component.navLinks = [
      { route: '/home', name: 'Home' },
      { route: '/about', name: 'About' },
    ];
    fixture.detectChanges();

    const navLinkElements = fixture.debugElement.queryAll(By.css('.nav-link'));
    expect(navLinkElements.length).toBe(2);
    expect(navLinkElements[0].nativeElement.textContent.trim()).toBe('Home');
    expect(navLinkElements[1].nativeElement.textContent.trim()).toBe('About');
  });
});
