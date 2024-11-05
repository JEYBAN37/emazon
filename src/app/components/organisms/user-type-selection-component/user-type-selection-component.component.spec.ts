import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeSelectionComponentComponent } from './user-type-selection-component.component';

describe('UserTypeSelectionComponentComponent', () => {
  let component: UserTypeSelectionComponentComponent;
  let fixture: ComponentFixture<UserTypeSelectionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTypeSelectionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTypeSelectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
