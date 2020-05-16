import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservationActualComponent } from './admin-reservation-actual.component';

describe('AdminReservationActualComponent', () => {
  let component: AdminReservationActualComponent;
  let fixture: ComponentFixture<AdminReservationActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReservationActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReservationActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
