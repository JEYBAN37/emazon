import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseSupplyComponent } from './response-supply.component';

describe('ResponseSupplyComponent', () => {
  let component: ResponseSupplyComponent;
  let fixture: ComponentFixture<ResponseSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
