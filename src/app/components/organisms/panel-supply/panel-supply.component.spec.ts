import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSupplyComponent } from './panel-supply.component';

describe('PanelSupplyComponent', () => {
  let component: PanelSupplyComponent;
  let fixture: ComponentFixture<PanelSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
