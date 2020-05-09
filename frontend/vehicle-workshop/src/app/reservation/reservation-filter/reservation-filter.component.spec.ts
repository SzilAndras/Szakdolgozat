import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFilterComponent } from './reservation-filter.component';

describe('ReservationFilterComponent', () => {
  let component: ReservationFilterComponent;
  let fixture: ComponentFixture<ReservationFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
