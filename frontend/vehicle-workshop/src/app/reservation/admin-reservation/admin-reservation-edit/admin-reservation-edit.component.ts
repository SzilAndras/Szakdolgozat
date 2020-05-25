import {Component, OnInit} from '@angular/core';
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
import {TimeByIndex} from '../../../shared/time-table/model/time-by-index.enum';

@Component({
  selector: 'app-admin-reservation-edit',
  templateUrl: './admin-reservation-edit.component.html',
  styleUrls: ['./admin-reservation-edit.component.scss']
})
export class AdminReservationEditComponent implements OnInit {
  faCalendar = faCalendarAlt;
  dateAppointmentsHandoverAll: AppointmentInterface[] = [];
  dateAppointmentsWorks: AppointmentInterface[] = [];



  user: UserInterface = {id: 1, email: 'asd@asd.asd', fullName: 'Gipsz Jakab', username: 'asd_user', phone: '06309483882'};
  // TODO TODO TODO

  reservation: ReservationInterface;

  appointments: AppointmentInterface[] = [];

  workDate: NgbDate;
  handoverDate: NgbDate;

  //lastWorkDateTime: {date: NgbDate, time: string};

  baseHandover: AppointmentInterface;
  selectHandover = false;





  constructor(private servcie: ReservationService,
              private router: Router,
              private calendar: NgbCalendar,
              private appointmetHttp: AppointmentHttpService) {
    this.workDate =  this.calendar.getNext(this.calendar.getToday(), 'd', 1);
    this.handoverDate =  this.calendar.getNext(this.calendar.getToday(), 'd', 1);
  }

  ngOnInit(): void {
    this.reservation = this.servcie.getReservation();
    this.getDateAppointments(true);
    this.getDateAppointments(false);

    for (const app of this.reservation.appointments) {
      if (app.type === AppointmentType.HANDOVER) {
        this.baseHandover = app;
      }
      this.appointments.push(app);
    }
  }

  date(model: NgbDateStruct) {
    return model.year + '-' +
      (model.month < 10 ? '0' +  model.month :  model.month) + '-' +
      (model.day < 10 ? '0' +  model.day :  model.day);
  }

  get dateAppointmentsHandover() {
    if (this.baseHandover) {
      return this.dateAppointmentsHandoverAll.filter(app => app.id !== this.baseHandover.id);
    }
    return [];
  }

  get maxDateTime(): {date: NgbDate, time: string} {
    return {date: this.calendar.getNext(this.calendar.getToday(), 'd', 14), time: '8:00'};
  }

  get todayDateTime(): {date: NgbDate, time: string} {
    return {date: this.calendar.getToday(), time: '15:00'} ;
  }

  get tomorrowDateTime():{date: NgbDate, time: string} {
  return {date: this.calendar.getNext(this.calendar.getToday(), 'd', 1), time: '8:00'} ;
}

  get handoverDateTime(): {date: NgbDate, time: string} {
    if (this.handoverAppointment) {
      const handover = this.handoverAppointment;
      const date = handover.date.split('-');
      const handoverDate =  new NgbDate(+date[0], +date[1], +date[2]);
      return {date: handoverDate, time: this.handoverAppointment.time};
    } else {
      return undefined;
    }

  }

  get takeoverDateTime(): {date: NgbDate, time: string} {
    const takeover = this.takeoverAppointment;
    const date = takeover.date.split('-');
    const takeoverDate =  new NgbDate(+date[0], +date[1], +date[2]);
    return {date: takeoverDate, time: takeover.time};
  }

  get lastWorkDateTime (): {date: NgbDate, time: string} {
    if (!this.workAppointments.length) {
      return undefined;
    }
    let lastWorkDateTime = this.todayDateTime;
    for (const work of this.workAppointments) {
      const date = work.date.split('-');
      const workDate =  new NgbDate(+date[0], +date[1], +date[2]);
      if (lastWorkDateTime.date.before(workDate) ||
        (lastWorkDateTime.date.equals(workDate) && TimeByIndex[lastWorkDateTime.time] < TimeByIndex[work.time])) {
        lastWorkDateTime = {date: workDate, time: work.time};
      }
    }
    return  lastWorkDateTime;
  }

  get workAppointments() {
    return this.appointments.filter(app => app.type === AppointmentType.WORK) || [];
  }

  get handoverAppointment() {
    const handover = this.appointments.filter(app => app.type === AppointmentType.HANDOVER);
    return handover.length ? handover[0] : undefined;
  }

  get takeoverAppointment() {
    const takeover = this.appointments.filter(app => app.type === AppointmentType.TAKEOVER);
    return takeover.length ? takeover[0] : undefined;
  }




  getDateAppointments(isHandover: boolean) {
    this.appointmetHttp.getAppointmentsByDate(this.date(isHandover ? this.handoverDate : this.workDate)).subscribe(
      appo => isHandover ? this.dateAppointmentsHandoverAll = appo : this.dateAppointmentsWorks = appo
    );
  }

  onDateChange(isHandover: boolean, date: NgbDate) {
    if (isHandover) {
      this.handoverDate = date;
    }else {
        this.workDate = date;
     }

    this.appointmetHttp.getAppointmentsByDate(this.date(isHandover ? this.handoverDate : this.workDate)).subscribe(
      appo => {
        isHandover ? this.dateAppointmentsHandoverAll = appo : this.dateAppointmentsWorks = appo;
      }
    );
  }

  onAppointmentSelected(appointments: AppointmentInterface[]) {
    this.appointments = appointments;
    this.servcie.refreshAppointments(appointments);
    if (this.baseHandover) {
      if (this.handoverAppointment.date !== this.baseHandover.date ||
      this.handoverAppointment.time !== this.baseHandover.time) {
        this.selectHandover = true;
      } else {
        this.selectHandover = false;
      }

    }
  }

  onUpdate() {
    this.servcie.setReservation(this.reservation);
  }

  onSave() {
    if (this.reservation.userStatus === Status.ACCEPTED) {
      if (this.selectHandover) {
        this.onSuggest();
      } else {
        this.onAccept();
      }
    } else {
      this.servcie.sendReservation().subscribe(
        res => {
          if (res) {
            this.router.navigate(['view-reservations/actual']);
          }
          console.log(res);
        }
      );
    }
  }

  onReject() {
    this.servcie.reject();
  }

  onAccept() {
    this.servcie.accept();
  }

  onSuggest() {
    this.servcie.suggest();
  }

  onBack() {
    this.router.navigate(['view-reservations/actual']);
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
