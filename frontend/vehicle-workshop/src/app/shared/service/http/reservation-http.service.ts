import {Injectable} from '@angular/core';
import {ReservationInterface} from '../../model/interfaces/reservation.interface';
import {ReservationFilterInterface} from '../../model/interfaces/reservation-filter.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReservationFilterStatus} from '../../model/enums/reservation-filter-status.enum';
import {PageableInterface} from '../../model/interfaces/pageable.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationHttpService {

  readonly url = 'http://localhost:8080/reservation';
  readonly userId = 1;

  constructor(private http: HttpClient) {
  }

  save(reservation: ReservationInterface): Observable<ReservationInterface> {
    return this.http.post<ReservationInterface>(this.url + '/save', reservation);
  }


  getALlReservation(): Observable<ReservationInterface[]> {
    return this.http.get<ReservationInterface[]>(this.url);
  }

  getReservationsFiltered(filter: ReservationFilterInterface, page: number, size?: number): Observable<PageableInterface<ReservationInterface>> {
    let search = '';
    if (filter) {
      if (filter.plateNumber) {
        search += 'plateNumber:' + filter.plateNumber;
      }
      if (filter.status && filter.status !== ReservationFilterStatus.ALL) {
        search += 'userStatus:' + filter.status;
      }
      // TODO admin status, vin
    }
    const pageInfo = '&page=' + page + '&size=' + (size ? size : 5);
    return this.http.get<PageableInterface<ReservationInterface>>(this.url + '?search=' + search + pageInfo);

  }

  revertReservation(reservation: ReservationInterface) {
    // TODO
  }
}
