import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRegisterComponent } from './panel-register.component';

describe('PanelRegisterComponent', () => {
  let component: PanelRegisterComponent;
  let fixture: ComponentFixture<PanelRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
