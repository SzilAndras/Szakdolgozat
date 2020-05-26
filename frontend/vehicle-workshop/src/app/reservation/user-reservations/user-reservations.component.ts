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
  page: {last: boolean, first: boolean, totalPages: number, number: number};
  selectedId: number;

  constructor(private service: ReservationHttpService) { }

  ngOnInit() {
    this.refreshReservations();
  }

  setFilter(filter: ReservationFilterInterface){
    this.filter = filter;
    this.refreshReservations();
  }

  refreshReservations(page: number = 0) {
    this.service.getReservationsFiltered(this.filter, page, 5).subscribe(
      pageable => {
        this.reservations = pageable.content;
        this.page = {last: pageable.last, first: pageable.first, number: pageable.number, totalPages: pageable.totalPages};
      }
    );
  }

  onSelect(id: number) {
    this.selectedId = id;
  }

  get selected() {
    return this.reservations.find(res => res.id === this.selectedId);
  }

}
