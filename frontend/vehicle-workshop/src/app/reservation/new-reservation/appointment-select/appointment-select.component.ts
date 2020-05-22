import {Component, OnInit} from '@angular/core';
import {AppointmentInterface} from '../../../shared/model/interfaces/appointment.interface';
import {ReservationService} from '../../../shared/service/reservation.service';
import {Router} from '@angular/router';
import {NgbDateStruct, NgbCalendar, NgbDate, NgbPeriod} from '@ng-bootstrap/ng-bootstrap';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {AppointmentHttpService} from '../../../shared/service/http/appointment-http.service';

@Component({
  selector: 'app-appointment-select',
  templateUrl: './appointment-select.component.html',
  styleUrls: ['./appointment-select.component.scss']
})
export class AppointmentSelectComponent implements OnInit {
  faCalendar = faCalendarAlt;
  appointments: AppointmentInterface[] = [];
  dateAppointments: AppointmentInterface[] = [];
  model: NgbDateStruct;

  constructor(private saveReservationService: ReservationService,
              private router: Router,
              private calendar: NgbCalendar,
              private appointmetHttp: AppointmentHttpService) {
    this.model = calendar.getToday();
  }

  ngOnInit(): void {
    this.getDateAppointments();
    this.appointments = this.saveReservationService.getReservation().appointments;
  }

  appointmentsSelected(appointments: AppointmentInterface[]) {
    this.appointments = appointments;
    this.saveReservationService.refreshAppointments(this.appointments);
    console.log(this.model);
  }

  get maxDate(): NgbDate {
    return this.calendar.getNext(this.calendar.getToday(), 'w' as NgbPeriod, 2);
  }

  getToday(): NgbDate {
    return  this.calendar.getToday();
  }


  onBack() {
    this.router.navigate(['reservation/vehicle-conf']);

  }

  onNext() {
    this.router.navigate(['reservation/overview']);
  }

  get date() {
    return this.model.year + '-' + (this.model.month < 10 ? '0' +  this.model.month :  this.model.month) + '-' + (this.model.day < 10 ? '0' +  this.model.day :  this.model.day);
  }

  getDateAppointments() {
    this.appointmetHttp.getAppointmentsByDate(this.date).subscribe(
      appo => this.dateAppointments = appo
    );
  }

  onDateChanged() {
    this.getDateAppointments();
  }


}