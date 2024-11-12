import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetBuyComponent } from './tarjet-buy.component';

describe('TarjetBuyComponent', () => {
  let component: TarjetBuyComponent;
  let fixture: ComponentFixture<TarjetBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetBuyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
