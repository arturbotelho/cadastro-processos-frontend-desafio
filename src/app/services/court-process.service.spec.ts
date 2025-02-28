import { TestBed } from '@angular/core/testing';

import { CourtProcessService } from './court-process.service';

describe('CourtProcessService', () => {
  let service: CourtProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourtProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
