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

  readonly url = 'http://localhost:8081/reservation';
  readonly userId = 1;

  constructor(private http: HttpClient) {
  }

  save(reservation: ReservationInterface): Observable<ReservationInterface> {
    return this.http.post<ReservationInterface>(this.url + '/save', reservation);
  }

  // TODO user id
  getUserReservations(): Observable<ReservationInterface[]> {
  return this.http.get<ReservationInterface[]>(this.url + '/byUserId/' + this.userId);
  }

  getReservationsByAdminStatus() {
    // TODO
  }

  getReservationsByUserStatus() {
    // TODO
  }

  getALlReservation(): Observable<ReservationInterface[]> {
    return this.http.get<ReservationInterface[]>(this.url);
    /* return [
       {
         id: 1,
         adminStatus: Status.ACCEPTED,
         userStatus: Status.ACCEPTED,
         plateNumber: 'ASD-123',
         vehicleType: 'VW' +
           ' golf',
         userId: 1,
         vin: 'ASDDSA123',
         works: [{id: 1, periodOfTime: 30, status: Status.ACCEPTED, work: 'asd', price: 10000}],
         appointments: [
           {
             id: 1,
             date: "2020-05-10",
             time: "8:00",
             status: AppointmentStatus.ACCEPTED,
             type: AppointmentType.HANDOVER
           },
           {
             id: 2,
             date: "2020-05-10",
             time: "14:00",
             status: AppointmentStatus.ACCEPTED,
             type: AppointmentType.WORK
           },
           {
             id: 3,
             date: "2020-05-11",
             time: "8:00",
             status: AppointmentStatus.ACCEPTED,
             type: AppointmentType.WORK
           },
           {
             id: 4,
             date: "2020-05-11",
             time: "14:00",
             status: AppointmentStatus.ACCEPTED,
             type: AppointmentType.TAKEOVER
           },
         ],
         comments: null
       },
       {
         id: 2,
         adminStatus: Status.PENDING,
         userStatus: Status.PENDING,
         plateNumber: 'ASD-123',
         vehicleType: 'VW' +
           ' golf',
         userId: 1,
         vin: 'ASDDSA123',
         works: [{id: 3, periodOfTime: 30, status: Status.ACCEPTED, work: 'asd', price: 10000}],
         appointments: [
           {
             id: 1,
             date: "2020-05-10",
             time: "8:30",
             status: AppointmentStatus.ACCEPTED,
             type: AppointmentType.HANDOVER
           },
           {
             id: 2,
             date: "2020-05-10",
             time: "14:30",
             status: AppointmentStatus.ACCEPTED,
             type: AppointmentType.WORK
           },
           {
             id: 3,
             date: "2020-05-11",
             time: "8:30",
             status: AppointmentStatus.ACCEPTED,
             type: AppointmentType.WORK
           },
           {
             id: 4,
             date: "2020-05-11",
             time: "14:30",
             status: AppointmentStatus.ACCEPTED,
             type: AppointmentType.TAKEOVER
           },
         ],
         comments: null
       }
     ]*/
    // TODO
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
    // TODO
    /*return [
      {
        id: 1,
        adminStatus: Status.ACCEPTED,
        userStatus: Status.ACCEPTED,
        plateNumber: 'ASD-123',
        vehicleType: 'VW' +
          ' golf',
        userId: 1,
        vin: 'ASDDSA123',
        works: [{id: 1, periodOfTime: 30, status: Status.ACCEPTED, work: 'asd', price: 10000}],
        appointments: [
          {
            id: 1,
            date: '2020-05-10',
            time: '8:00',
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.HANDOVER
          },
          {
            id: 2,
            date: '2020-05-10',
            time: '14:00',
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {
            id: 3,
            date: '2020-05-11',
            time: '8:00',
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {
            id: 4,
            date: '2020-05-11',
            time: '14:00',
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.TAKEOVER
          },
        ],
        comments: null
      },
      {
        id: 2,
        adminStatus: Status.ACCEPTED,
        userStatus: Status.PENDING,
        plateNumber: 'ASD-123',
        vehicleType: 'VW' +
          ' golf',
        userId: 1,
        vin: 'ASDDSA123',
        works: [{id: 3, periodOfTime: 30, status: Status.ACCEPTED, work: 'asd', price: 10000}],
        appointments: [
          {
            id: 5,
            date: '2020-05-10',
            time: '8:30',
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.HANDOVER
          },
          {
            id: 6,
            date: '2020-05-10',
            time: '14:30',
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {
            id: 7,
            date: '2020-05-11',
            time: '8:30',
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {
            id: 8,
            date: '2020-05-11',
            time: '14:30',
            status: AppointmentStatus.SUGGESTED,
            type: AppointmentType.TAKEOVER
          },
        ],
        comments: null
      }
      ,
      {
        id: 3,
        adminStatus: Status.REJECTED,
        userStatus: Status.ACCEPTED,
        plateNumber: 'ASD-123',
        vehicleType: 'VW' +
          ' golf',
        userId: 1,
        vin: 'ASDDSA123',
        works: [{id: 4, periodOfTime: 30, status: Status.ACCEPTED, work: 'asd', price: 10000}],
        appointments: [
          {
            id: 9,
            date: '2020-05-12',
            time: '8:30',
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.HANDOVER
          },
          {
            id: 10,
            date: '2020-05-12',
            time: '14:30',
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {
            id: 11,
            date: '2020-05-13',
            time: '8:30',
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {
            id: 12,
            date: '2020-05-13',
            time: '14:30',
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.TAKEOVER
          },
        ],
        comments: null
      }
    ];*/
  }

  revertReservation(reservation: ReservationInterface) {
    // TODO
  }
}
