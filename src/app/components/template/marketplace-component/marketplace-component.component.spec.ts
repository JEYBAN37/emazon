import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceComponentComponent } from './marketplace-component.component';

describe('MarketplaceComponentComponent', () => {
  let component: MarketplaceComponentComponent;
  let fixture: ComponentFixture<MarketplaceComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
