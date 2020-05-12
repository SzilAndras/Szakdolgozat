import { Component, OnInit } from '@angular/core';
import {ReservationFilterInterface} from "../../shared/model/interfaces/reservation-filter.interface";
import {ReservationInterface} from "../../shared/model/interfaces/reservation.interface";
import {ReservationHttpService} from "../../shared/service/http/reservation-http.service";

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss']
})
export class UserReservationsComponent implements OnInit {

  filter: ReservationFilterInterface;
  reservations: ReservationInterface[] = [];
  selectedId: number;

  constructor(private service: ReservationHttpService) { }

  ngOnInit() {
    this.service.getUserReservations().subscribe(
      res => this.reservations = res
    );
  }

  setFilter(filter: ReservationFilterInterface){
    this.filter = filter;
    this.reservations = this.service.getReservationsFiltered(this.filter);
  }

  onSelect(id: number) {
    this.selectedId = id;
  }

  get selected() {
    return this.reservations.find(res => res.id === this.selectedId);
  }

}
