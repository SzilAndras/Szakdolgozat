import {Injectable} from '@angular/core';
import {AppointmentInterface} from '../../model/interfaces/appointment.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentHttpService {
  readonly url = 'http://localhost:8080/appointment';

  constructor(private http: HttpClient) { }

  getAppointmentsByDate(date: string): Observable<AppointmentInterface[]> {
    return this.http.get<AppointmentInterface[]>(this.url + '?date=' + date);
   /* return [
      {id: 1,
          date: '2020-05-10',
          time: '8:00',
          status: AppointmentStatus.ACCEPTED,
          type: AppointmentType.WORK
        },
      {id: 2,
        date: '2020-05-10',
        time: '14:00',
        status: AppointmentStatus.ACCEPTED,
        type: AppointmentType.WORK
      },
      {id: 3,
        date: '2020-05-11',
        time: '8:00',
        status: AppointmentStatus.ACCEPTED,
        type: AppointmentType.WORK
      },
      {id: 4,
        date: '2020-05-11',
        time: '14:00',
        status: AppointmentStatus.ACCEPTED,
        type: AppointmentType.WORK
      },
    ];*/
    // TODO
    }


}
