import {Component, OnInit} from '@angular/core';
import {ReservationFilterInterface} from '../../../shared/model/interfaces/reservation-filter.interface';
import {ReservationInterface} from '../../../shared/model/interfaces/reservation.interface';
import {ReservationHttpService} from '../../../shared/service/http/reservation-http.service';
import {Router} from '@angular/router';
import {ReservationService} from '../../../shared/service/reservation.service';
import {ReservationFilterStatus} from '../../../shared/model/enums/reservation-filter-status.enum';

@Component({
  selector: 'app-admin-reservation-actual',
  templateUrl: './admin-reservation-actual.component.html',
  styleUrls: ['./admin-reservation-actual.component.scss']
})
export class AdminReservationActualComponent implements OnInit {
  filter: ReservationFilterInterface;
  reservations: ReservationInterface[] = [];
  page: {last: boolean, first: boolean, totalPages: number, number: number};

  constructor(private http: ReservationHttpService, private service: ReservationService, private router: Router) { }

  ngOnInit(): void {
    this.filter = JSON.parse(localStorage.getItem('reservation-filter'));
    this.page = JSON.parse(localStorage.getItem('page'));

    if (!this.filter) {
      this.filter = {status: ReservationFilterStatus.ALL, plateNumber: '', type: ''};
    }
    if (!this.page) {
      this.page = {last: null, first: null, totalPages: null, number: 0};
    }
    this.refreshReservations();
  }

  setFilter(f: ReservationFilterInterface) {
    this.filter = f;
    this.refreshReservations();
  }

  refreshReservations(page: number = this.page ? this.page.number : 0) {
    this.http.getReservationsFiltered(this.filter, page, 6).subscribe(
      pageable => {
        this.reservations = pageable.content;
        this.page = {last: pageable.last, first: pageable.first, number: pageable.number, totalPages: pageable.totalPages};
      }
    );
  }

  onSelected(id: number) {
    this.service.setReservation(this.reservations.find(res => res.id === id));
    localStorage.setItem('reservation-filter', JSON.stringify( this.filter));
    localStorage.setItem('page', JSON.stringify( this.page));
    this.router.navigate(['view-reservations/edit']);
  }
}
