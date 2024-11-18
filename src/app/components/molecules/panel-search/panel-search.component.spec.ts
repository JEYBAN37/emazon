import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelSearchComponent } from './panel-search.component';
import { By } from '@angular/platform-browser';

describe('PanelSearchComponent', () => {
  let component: PanelSearchComponent;
  let fixture: ComponentFixture<PanelSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize search parameters as empty strings', () => {
    expect(component.searchName).toBe('');
    expect(component.searchBrand).toBe('');
    expect(component.searchArticle).toBe('');
  });

  it('should emit searchParams with updated searchName on handleSearchName', () => {
    const emitSpy = jest.spyOn(component.searchParams, 'emit');
    const mockName = 'Test Name';

    component.handleSearchName(mockName);
    expect(component.searchName).toBe(mockName);
    expect(emitSpy).toHaveBeenCalledWith({
      name: mockName,
      brand: '',
      category: ''
    });
  });

  it('should emit searchParams with updated searchBrand on handleSearchBrand', () => {
    const emitSpy = jest.spyOn(component.searchParams, 'emit');
    const mockBrand = 'Test Brand';

    component.handleSearchBrand(mockBrand);
    expect(component.searchBrand).toBe(mockBrand);
    expect(emitSpy).toHaveBeenCalledWith({
      name: '',
      brand: mockBrand,
      category: ''
    });
  });

  it('should emit searchParams with updated searchArticle on handleSearchArticle', () => {
    const emitSpy = jest.spyOn(component.searchParams, 'emit');
    const mockArticle = 'Test Article';

    component.handleSearchArticle(mockArticle);
    expect(component.searchArticle).toBe(mockArticle);
    expect(emitSpy).toHaveBeenCalledWith({
      name: '',
      brand: '',
      category: mockArticle
    });
  });

  it('should emit correct searchParams when emitSearchParams is called', () => {
    const emitSpy = jest.spyOn(component.searchParams, 'emit');

    component.searchName = 'Test Name';
    component.searchBrand = 'Test Brand';
    component.searchArticle = 'Test Article';
    
    component.emitSearchParams();

    expect(emitSpy).toHaveBeenCalledWith({
      name: 'Test Name',
      brand: 'Test Brand',
      category: 'Test Article'
    });
  });
});
