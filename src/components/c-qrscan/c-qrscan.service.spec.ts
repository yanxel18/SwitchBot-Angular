import { TestBed } from '@angular/core/testing';

import { CQrscanService } from './c-qrscan.service';

describe('CQrscanService', () => {
  let service: CQrscanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CQrscanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
