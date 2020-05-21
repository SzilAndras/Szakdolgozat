import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.scss']
})
export class AdminReservationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  reservationOnSelect(asd: any) {
    console.log(asd);
  }
}
