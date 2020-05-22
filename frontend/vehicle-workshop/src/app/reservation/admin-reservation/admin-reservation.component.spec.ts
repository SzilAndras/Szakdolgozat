import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservationComponent } from './admin-reservation.component';

describe('AdminReservationComponent', () => {
  let component: AdminReservationComponent;
  let fixture: ComponentFixture<AdminReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});