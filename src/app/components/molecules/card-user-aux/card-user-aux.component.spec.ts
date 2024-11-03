import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserAuxComponent } from './card-user-aux.component';

describe('CardUserAuxComponent', () => {
  let component: CardUserAuxComponent;
  let fixture: ComponentFixture<CardUserAuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardUserAuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUserAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
