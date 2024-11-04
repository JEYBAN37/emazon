import { TestBed } from '@angular/core/testing';

import { UserAuxServiceService } from './shared/services/user-aux-service.service';

describe('UserAuxServiceService', () => {
  let service: UserAuxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
