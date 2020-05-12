import { Component, OnInit } from '@angular/core';
import {SaveReservationService} from "../../../shared/service/save-reservation.service";
import {Router} from "@angular/router";
import {ReservationInterface} from "../../../shared/model/interfaces/reservation.interface";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  reservation: ReservationInterface;

  constructor(private saveReservationService: SaveReservationService, private router: Router) {
    this.reservation = this.saveReservationService.getReservation();
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this.router.navigate(['reservation/appointment-select']);
  }

  onSend(): void {
    // TODO validate
    this.saveReservationService.sendReservation().subscribe(
      res => {
        console.log(res);
      }
    );

  }

  isValid(): boolean {
    return true;
  }

}
