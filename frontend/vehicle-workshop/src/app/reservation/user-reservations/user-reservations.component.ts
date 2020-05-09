import { Component, OnInit } from '@angular/core';
import {ReservationFilterInterface} from "../../shared/model/interfaces/reservation-filter.interface";
import {ReservationFilterStatus} from "../../shared/model/enums/reservation-filter-status.enum";

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss']
})
export class UserReservationsComponent implements OnInit {

  filter: ReservationFilterInterface;

  constructor() { }

  ngOnInit() {
    this.filter = {status: ReservationFilterStatus.ALL, type: '', plateNumber: ''};
  }

  setFilter(filter: ReservationFilterInterface){
    this.filter = filter;
  }

}
