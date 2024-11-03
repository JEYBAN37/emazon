import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGetCategoriesComponent } from './card-get-categories.component';

describe('CardGetCategoriesComponent', () => {
  let component: CardGetCategoriesComponent;
  let fixture: ComponentFixture<CardGetCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardGetCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardGetCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
