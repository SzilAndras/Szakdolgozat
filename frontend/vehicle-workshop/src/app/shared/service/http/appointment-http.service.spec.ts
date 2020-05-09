import { TestBed } from '@angular/core/testing';

import { AppointmentHttpService } from './appointment-http.service';

describe('AppointmentHttpService', () => {
  let service: AppointmentHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
