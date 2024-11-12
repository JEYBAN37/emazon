import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEmploimentComponent } from './page-emploiment.component';

describe('PageEmploimentComponent', () => {
  let component: PageEmploimentComponent;
  let fixture: ComponentFixture<PageEmploimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEmploimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEmploimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
