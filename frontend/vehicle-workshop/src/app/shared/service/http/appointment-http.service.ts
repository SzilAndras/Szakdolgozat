import {Injectable} from '@angular/core';
import {AppointmentInterface} from '../../model/interfaces/appointment.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentHttpService {
  readonly url = 'api/appointment';

  constructor(private http: HttpClient) { }

  getAppointmentsByDate(date: string): Observable<AppointmentInterface[]> {
    return this.http.get<AppointmentInterface[]>(this.url + '?date=' + date);
    };

  getClosedAppointmentsByDate(date: string): Observable<AppointmentInterface[]> {
    return this.http.get<AppointmentInterface[]>(this.url + '/closed' + '?date=' + date);
  };

  saveClosedAppointments(appos: AppointmentInterface[]) {
    return this.http.post<any>(this.url + '/closed', appos);
  }

}
