import { TestBed } from '@angular/core/testing';

import { UserRegisterServiceService } from './user-register.service';

describe('UserRegisterServiceService', () => {
  let service: UserRegisterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegisterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
