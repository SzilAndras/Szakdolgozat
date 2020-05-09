import { Component, OnInit } from '@angular/core';
import {ReservationInterface} from "../../../shared/model/interfaces/reservation.interface";
import {AppointmentInterface} from "../../../shared/model/interfaces/appointment.interface";
import {ReservationHttpService} from "../../../shared/service/http/reservation-http.service";
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Status} from "../../../shared/model/enums/status.enum";

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {
  faCalendar = faCalendarAlt;
  model: NgbDateStruct;

  id: number;
  reservation: ReservationInterface;
  handover: AppointmentInterface;
  selectHandover = false;

  get handoverDate() {
    return this.model ? this.model.year+'-'+this.model.month+'-'+this.model.day : undefined;
  }


  constructor(
    private reservationHttpService: ReservationHttpService,
    private calendar: NgbCalendar
  ) {
    this.model = calendar.getToday();
  }

  ngOnInit() {
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

  onHandoverSelected(appointment: AppointmentInterface[]){
    this.handover = appointment[0];
  }

  onChangeHandoverDate(): void {
    console.log('onChangeHandoverDate');
  }

  onAccept(){

  }

  onReject(){

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
