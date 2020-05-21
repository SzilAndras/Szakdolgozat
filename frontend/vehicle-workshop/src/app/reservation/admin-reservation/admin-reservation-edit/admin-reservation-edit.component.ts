import { Component, OnInit} from '@angular/core';
import {ReservationInterface} from '../../../shared/model/interfaces/reservation.interface';
import {ReservationService} from '../../../shared/service/reservation.service';
import {Router} from '@angular/router';
import {AppointmentInterface} from '../../../shared/model/interfaces/appointment.interface';
import {AppointmentType} from '../../../shared/model/enums/appointmentType.enum';
import {UserInterface} from '../../../shared/model/interfaces/user.interface';
import {Status} from '../../../shared/model/enums/status.enum';
import {NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {AppointmentHttpService} from '../../../shared/service/http/appointment-http.service';

@Component({
  selector: 'app-admin-reservation-edit',
  templateUrl: './admin-reservation-edit.component.html',
  styleUrls: ['./admin-reservation-edit.component.scss']
})
export class AdminReservationEditComponent implements OnInit {
  faCalendar = faCalendarAlt;
  dateAppointmentsHandover: AppointmentInterface[] = [];
  dateAppointmentsWorks: AppointmentInterface[] = [];



  user: UserInterface = {id: 1, email: 'asd@asd.asd', fullName: 'Gipsz Jakab', phoneNumber: '06309483882'};

  reservation: ReservationInterface;

  appointments: AppointmentInterface[] = [];

  workDate: NgbDate;
  handoverDate: NgbDate;



  constructor(private servcie: ReservationService,
              private router: Router,
              private calendar: NgbCalendar,
              private appointmetHttp: AppointmentHttpService) {
    this.workDate =  calendar.getToday();
    this.handoverDate =  calendar.getToday();
  }

  ngOnInit(): void {
    this.reservation = this.servcie.getReservation();
    this.getDateAppointments(true);
    this.getDateAppointments(false);

    for (const app of this.reservation.appointments) {
      this.appointments.push(app);
    }
    console.log(this.calendar.getNext(this.calendar.getToday(), 'd', 14));
  }

  date(model: NgbDateStruct) {
    return model.year + '-' + (model.month < 10 ? '0' +  model.month :  model.month) + '-' + (model.day < 10 ? '0' +  model.day :  model.day);
  }

  get maxDate(): NgbDate {
    return this.calendar.getNext(this.calendar.getToday(), 'd', 14);
  }

  getToday(): NgbDate {
    return  this.calendar.getToday();
  }


  getDateAppointments(isHandover: boolean) {
    this.appointmetHttp.getAppointmentsByDate(this.date(isHandover ? this.handoverDate : this.workDate)).subscribe(
      appo => isHandover ? this.dateAppointmentsHandover = appo : this.dateAppointmentsWorks = appo
    );
  }

  onDateChange(isHandover: boolean, date: NgbDate) {
    isHandover ? this.handoverDate = date : this.workDate = date;
    console.log(this.workDate);

    this.appointmetHttp.getAppointmentsByDate(this.date(isHandover ? this.handoverDate : this.workDate)).subscribe(
      appo => {
        isHandover ? this.dateAppointmentsHandover = appo : this.dateAppointmentsWorks = appo;
      }
    );
  }

  onAppointmentSelected(appointments: AppointmentInterface[]) {
    console.log(appointments);
    this.appointments = appointments;
/*    this.appointments = this.appointments.filter(app => app.type !== AppointmentType.WORK);
    for (const app of appointments) {
      this.appointments.push(app);
    }*/
  }

  get workAppointments() {
    return this.appointments.filter(app => app.type === AppointmentType.WORK);
  }

  get handoverAppointment() {
    const handover = this.appointments.filter(app => app.type === AppointmentType.HANDOVER);
    return handover.length ? handover[0] : undefined;
  }

  get takeoverAppointment() {
    const takeover = this.appointments.filter(app => app.type === AppointmentType.TAKEOVER);
    return takeover.length ? takeover[0] : undefined;
  }

  onUpdate() {
    this.servcie.setReservation(this.reservation);
  }

  onSave() {
    this.servcie.sendReservation();
    this.router.navigate(['view-reservations/actual']);
  }

  onReject() {

  }

  onBack() {

  }

  valuesSum(): {timeSum: number, priceSum: number} {
    const values = {timeSum: 0, priceSum: 0};
    for (const work of this.reservation.works) {
      values.timeSum += +work.periodOfTime;
      values.priceSum += +work.price;
    }
    return values;
  }

  isFull() {
    let current = 0;
    this.workAppointments.forEach(() => current += 30);
    return current <= this.valuesSum().timeSum;
  }

  isAcceptedByAdmin(): boolean {
    return this.reservation.adminStatus === Status.ACCEPTED;
  }

  isAcceptedByUser(): boolean {
    return this.reservation.userStatus === Status.ACCEPTED;
  }

  isRejected(): boolean {
    return (this.reservation.userStatus === Status.REJECTED || this.reservation.adminStatus === Status.REJECTED);
  }

}
