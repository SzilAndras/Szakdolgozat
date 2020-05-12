import { TestBed } from '@angular/core/testing';

import { RatingHttpService } from './rating-http.service';

describe('RatingHttpService', () => {
  let service: RatingHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
