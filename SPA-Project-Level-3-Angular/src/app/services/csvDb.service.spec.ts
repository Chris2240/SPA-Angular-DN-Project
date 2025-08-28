import { TestBed } from '@angular/core/testing';

import { CsvDbService } from './csvDb.service';

describe('CsvDbService', () => {
  let service: CsvDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
