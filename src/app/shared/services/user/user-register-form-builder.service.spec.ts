import { TestBed } from '@angular/core/testing';

import { UserRegisterFormBuilderService } from './user-register-form-builder.service';

describe('UserRegisterFormBuilderService', () => {
  let service: UserRegisterFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegisterFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
