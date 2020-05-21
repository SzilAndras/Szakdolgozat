import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservationEditComponent } from './admin-reservation-edit.component';

describe('AdminReservationEditComponent', () => {
  let component: AdminReservationEditComponent;
  let fixture: ComponentFixture<AdminReservationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReservationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReservationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
