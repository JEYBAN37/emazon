import { TestBed } from '@angular/core/testing';

import { UserLoginFormBuilderService } from '../../../user-login-form-builder.service';

describe('UserLoginFormBuilderService', () => {
  let service: UserLoginFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoginFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
