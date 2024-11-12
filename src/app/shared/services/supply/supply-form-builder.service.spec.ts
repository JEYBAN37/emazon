import { TestBed } from '@angular/core/testing';

import { SupplyFormBuilderService } from './supply-form-builder.service';

describe('SupplyFormBuilderService', () => {
  let service: SupplyFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplyFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
