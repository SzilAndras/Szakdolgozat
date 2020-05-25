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

  readonly url = '/api/reservation';

  constructor(private http: HttpClient) {
  }

  save(reservation: ReservationInterface): Observable<ReservationInterface> {
    return this.http.post<ReservationInterface>(this.url + '/save', reservation);
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

  accept(id: number) {
    return this.http.post<ReservationInterface>(this.url + '/accept?id=' + id, null);
  }

  reject(id: number) {
    return this.http.post<ReservationInterface>(this.url + '/reject?id=' + id, null);
  }

  suggest(res: ReservationInterface) {
    return this.http.post<ReservationInterface>(this.url + '/suggest', res);
  }

}
