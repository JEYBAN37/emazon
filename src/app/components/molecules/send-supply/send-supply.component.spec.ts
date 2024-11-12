import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSupplyComponent } from './send-supply.component';

describe('SendSupplyComponent', () => {
  let component: SendSupplyComponent;
  let fixture: ComponentFixture<SendSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
