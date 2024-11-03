import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGetBrandsComponent } from './card-get-brands.component';

describe('CardGetBrandsComponent', () => {
  let component: CardGetBrandsComponent;
  let fixture: ComponentFixture<CardGetBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardGetBrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardGetBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
