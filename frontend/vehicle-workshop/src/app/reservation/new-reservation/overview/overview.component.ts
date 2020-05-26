import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../../../shared/service/reservation.service";
import {Router} from "@angular/router";
import {ReservationInterface} from "../../../shared/model/interfaces/reservation.interface";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  reservation: ReservationInterface;

  constructor(private saveReservationService: ReservationService, private router: Router) {
    this.reservation = this.saveReservationService.getReservation();
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this.router.navigate(['reservation/appointment-select']);
  }

  onSend(): void {
    this.saveReservationService.sendReservation().subscribe(
      res => {
        this.router.navigate(['my-reservations']);
      }
    );

  }

  isValid(): boolean {
    return true;
  }

}
