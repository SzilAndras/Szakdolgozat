import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReservationInterface} from "../../shared/model/interfaces/reservation.interface";

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  @Input() reservations: ReservationInterface[] = [];
  @Output() reservationSelected: EventEmitter<number> = new EventEmitter();

  selected: number;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(id: number) {
    this.selected = id;
    this.reservationSelected.emit(this.selected);
  }

}
