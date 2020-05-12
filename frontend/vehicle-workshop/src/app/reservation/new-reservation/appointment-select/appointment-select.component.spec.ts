import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSelectComponent } from './appointment-select.component';

describe('AppointmentSelectComponent', () => {
  let component: AppointmentSelectComponent;
  let fixture: ComponentFixture<AppointmentSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
