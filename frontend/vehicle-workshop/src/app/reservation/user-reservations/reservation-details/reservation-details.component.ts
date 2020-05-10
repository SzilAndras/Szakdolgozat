import {Component, Input, OnInit} from '@angular/core';
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
  @Input() reservation: ReservationInterface;

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
    this.handover = appointment[0];
  }


  onAccept(){
    // todo

  }

  onReject(){
    // todo
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
