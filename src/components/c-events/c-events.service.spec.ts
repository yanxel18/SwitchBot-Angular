import { TestBed } from '@angular/core/testing';

import { CEventsService } from './c-events.service';

describe('CEventsService', () => {
  let service: CEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
