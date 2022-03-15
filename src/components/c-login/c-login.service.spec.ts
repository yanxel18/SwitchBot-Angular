import { TestBed } from '@angular/core/testing';

import { CLoginService } from './c-login.service';

describe('CLoginService', () => {
  let service: CLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
