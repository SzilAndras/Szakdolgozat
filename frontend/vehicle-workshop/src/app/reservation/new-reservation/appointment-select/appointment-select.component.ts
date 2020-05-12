import {Component, OnInit, ViewChild} from '@angular/core';
import {AppointmentInterface} from "../../../shared/model/interfaces/appointment.interface";
import {SaveReservationService} from "../../../shared/service/save-reservation.service";
import {Router} from "@angular/router";
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-appointment-select',
  templateUrl: './appointment-select.component.html',
  styleUrls: ['./appointment-select.component.scss']
})
export class AppointmentSelectComponent implements OnInit {
  faCalendar = faCalendarAlt;
  appointments: AppointmentInterface[] = [];
  model: NgbDateStruct;

  constructor(private saveReservationService: SaveReservationService,
              private router: Router,
              private calendar: NgbCalendar) {
    this.appointments = saveReservationService.getReservation().appointments;
    this.model = calendar.getToday();
    console.log(this.model);
  }

  ngOnInit(): void {
  }

  appointmentsSelected(appointments: AppointmentInterface[]) {
    this.appointments = appointments;
    this.saveReservationService.refreshAppointments(this.appointments);
    console.log(this.model);
  }

  onBack() {
    this.router.navigate(['reservation/vehicle-conf']);

  }

  onNext() {
    this.router.navigate(['reservation/overview']);
  }


}
