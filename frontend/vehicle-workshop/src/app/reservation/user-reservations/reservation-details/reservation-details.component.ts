import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReservationInterface} from "../../../shared/model/interfaces/reservation.interface";
import {AppointmentInterface} from "../../../shared/model/interfaces/appointment.interface";
import {ReservationHttpService} from "../../../shared/service/http/reservation-http.service";
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {NgbCalendar, NgbDate, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Status} from "../../../shared/model/enums/status.enum";
import {TimeByIndex} from "../../../shared/time-table/model/time-by-index.enum";
import {AppointmentType} from "../../../shared/model/enums/appointmentType.enum";
import {AppointmentHttpService} from "../../../shared/service/http/appointment-http.service";

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit, OnChanges {
  faCalendar = faCalendarAlt;
  model: NgbDateStruct;

  id: number;
  @Input() reservation: ReservationInterface;
  private dateAppointmentsAll: AppointmentInterface[] = [];

  handover: AppointmentInterface;
  selectHandover = false;


  lastWorkDateTime: {date: NgbDate, time: string};
  baseHandover: AppointmentInterface;

  get handoverDate() {
    return this.model ? this.model.year+'-'+this.model.month+'-'+this.model.day : undefined;
  }


  constructor(
    private reservationHttpService: ReservationHttpService,
    private calendar: NgbCalendar,
    private appointmetHttp: AppointmentHttpService
  ) {
    this.model = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
  }

  ngOnInit() {
    this.getDateAppointments();
    this.setLastWorkDateTime();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setLastWorkDateTime();
    this.baseHandover = this.handoverAppointment;
  }

  get dateAppointments() {
    if (this.baseHandover) {
      return this.dateAppointmentsAll.filter(app => app.id !== this.baseHandover.id);
    }
    return [];
  }

  get todayDateTime(): {date: NgbDate, time: string} {
    return {date: this.calendar.getToday(), time: '8:00'} ;
  }

  get workAppointments() {
    return this.reservation?.appointments.filter(app => app.type === AppointmentType.WORK) || [];
  }

  get handoverAppointment() {
    if (this.reservation) {
      const handover = this.reservation.appointments.filter(app => app.type === AppointmentType.HANDOVER);
      return handover.length ? handover[0] : undefined;
    }
    return undefined;
  }

  get maxDateTime(): {date: NgbDate, time: string} {
    return {date: this.calendar.getNext(this.calendar.getToday(), 'd', 14), time: '8:00'};
  }

  get minDateTime(): {date: NgbDate, time: string} {
    return this.lastWorkDateTime;
  }

  date(model: NgbDateStruct) {
    return model.year + '-' +
      (model.month < 10 ? '0' +  model.month :  model.month) + '-' +
      (model.day < 10 ? '0' +  model.day :  model.day);
  }

  getDateAppointments() {
    this.appointmetHttp.getAppointmentsByDate(this.date(this.model)).subscribe(
      appo => this.dateAppointmentsAll = appo
    );
  }

  onDateChanged(date: NgbDate) {
    this.model = date;
    this.getDateAppointments();
  }


  setLastWorkDateTime() {
    let lastWorkDateTime = {date: this.calendar.getToday(), time: '15:00'};
    for (const work of this.workAppointments) {
      const date = work.date.split('-');
      const workDate =  new NgbDate(+date[0], +date[1], +date[2]);
      console.log(workDate);
      console.log(lastWorkDateTime.date.before(workDate));
      if (lastWorkDateTime.date.before(workDate) ||
        (lastWorkDateTime.date.equals(workDate) && TimeByIndex[lastWorkDateTime.time] < TimeByIndex[work.time])) {
        lastWorkDateTime = {date: workDate, time: work.time};
      }
    }
    this.lastWorkDateTime = lastWorkDateTime;
  }


  valuesSum(): {timeSum: number, priceSum: number}{
    const values = {timeSum: 0, priceSum: 0};
    for (const work of this.reservation.works) {
      if(work.status.toString() === 'ACCEPTED'){
        values.timeSum += +work.periodOfTime;
        values.priceSum += +work.price;
      }
    }
    return values;
  }

  get reservationStatus():string {
    if (this.isAcceptedByAdmin() && this.isAcceptedByUser()) {
      return 'A foglalás elfogadva.';
    } else if(!this.isAcceptedByAdmin() && !this.isRejected()) {
      return 'A foglalás a szerviz válaszára vár.'
    } else if (this.isAcceptedByAdmin() && !this.isAcceptedByUser() && !this.isRejected()){
      return 'A foglalás az ön megerősítésére vár.';
    } else if (this.isRejected()) {
      return 'A foglalás el lett utasítva.';
    }
  }

  onHandoverSelected(appointment: AppointmentInterface[]){
    this.reservation.appointments = appointment;
    const idx = this.reservation.appointments.findIndex(app => app.type === AppointmentType.HANDOVER);
    this.handover = appointment[idx];
    console.log(appointment);
    if (this.baseHandover.date === appointment[idx].date && this.baseHandover.time === appointment[idx].time ) {
      this.selectHandover = false;
    } else {
      this.selectHandover = true;
    }

  }


  onAccept(){
    if (this.selectHandover) {
      this.onSuggest();
    } else {
      this.reservationHttpService.accept(this.reservation.id).subscribe(
        res => {
          console.log(res);
        }
      );
    }
  }

  onReject(){
    this.reservationHttpService.reject(this.reservation.id).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  onSuggest() {
/*
    const idx = this.reservation.appointments.findIndex(app => app.type === AppointmentType.HANDOVER);
*/
    this.reservationHttpService.suggest(this.reservation).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  onCancelHandoverSelect() {
    this.handover = undefined;
    this.selectHandover = false;
  }

  isAcceptedByAdmin(){
    return this.reservation.adminStatus === Status.ACCEPTED;
  }

  isAcceptedByUser() {
    return this.reservation.userStatus === Status.ACCEPTED;
  }

  isRejected() {
    return (this.reservation.userStatus === Status.REJECTED || this.reservation.adminStatus === Status.REJECTED );
  }


}
