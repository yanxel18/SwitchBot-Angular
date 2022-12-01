import { TestBed } from '@angular/core/testing';

import { CWorkerselectService } from './c-workerselect.service';

describe('CWorkerselectService', () => {
  let service: CWorkerselectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CWorkerselectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
