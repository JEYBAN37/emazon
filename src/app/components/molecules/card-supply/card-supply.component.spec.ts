import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSupplyComponent } from './card-supply.component';

describe('CardSupplyComponent', () => {
  let component: CardSupplyComponent;
  let fixture: ComponentFixture<CardSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
