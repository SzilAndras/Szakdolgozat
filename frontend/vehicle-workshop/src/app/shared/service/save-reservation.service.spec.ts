import { TestBed } from '@angular/core/testing';

import { SaveReservationService } from './save-reservation.service';

describe('SaveReservationService', () => {
  let service: SaveReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
