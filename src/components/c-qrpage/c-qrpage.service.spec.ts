import { TestBed } from '@angular/core/testing';

import { CQrpageService } from './c-qrpage.service';

describe('CQrpageService', () => {
  let service: CQrpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CQrpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
