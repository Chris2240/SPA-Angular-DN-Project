import { TestBed } from '@angular/core/testing';

import { ApplicantDataDbService } from './applicant-data-db.service';

describe('ApplicantDataDbService', () => {
  let service: ApplicantDataDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicantDataDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
