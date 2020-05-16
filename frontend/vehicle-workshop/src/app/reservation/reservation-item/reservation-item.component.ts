import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReservationInterface} from "../../shared/model/interfaces/reservation.interface";
import {Status} from "../../shared/model/enums/status.enum";
import {ReservationService} from "../../shared/service/reservation.service";
import {faQuestion} from "@fortawesome/free-solid-svg-icons/faQuestion";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faHourglassHalf} from "@fortawesome/free-solid-svg-icons/faHourglassHalf";

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.scss']
})
export class ReservationItemComponent implements OnInit {
  @Input() reservation: ReservationInterface;
  @Input() isSelected: boolean;
  @Output() selected = new EventEmitter<number>();
  icon = faQuestion;
  title = '';
  class = '';

  constructor(private service: ReservationService) {
    this.reservation = service.getReservation();
  }

  ngOnInit(): void {
    if (this.isAccepted()) {
      this.icon = faCheck;
      this.title = 'Elfogadva';
      this.class = 'accepted';
    } else if (this.isRejected()) {
      this.icon = faTimes;
      this.title = 'Elutasítva';
      this.class = 'rejected';
    } else if (this.isPending()) {
      this.icon = faQuestion;
      this.title = 'Függőben';
      this.class = 'pending';
    } else if (this.isAcceptable()) {
      this.icon = faHourglassHalf;
      this.title= 'Megerősítésre vár';
      this.class = 'acceptable';
    }
  }

  onSelect() {
    this.selected.emit(this.reservation.id);
  }

  isAccepted() {
    return this.reservation.adminStatus === Status.ACCEPTED && this.reservation.userStatus === Status.ACCEPTED;
  }

  isRejected() {
    return this.reservation.adminStatus === Status.REJECTED || this.reservation.userStatus === Status.REJECTED;
  }

  isPending() {
    return (!(this.reservation.adminStatus === Status.ACCEPTED) && !this.isRejected());
  }

  isAcceptable() {
    return this.reservation.adminStatus === Status.ACCEPTED && !(this.reservation.userStatus === Status.ACCEPTED) && !this.isRejected();
  }

}
