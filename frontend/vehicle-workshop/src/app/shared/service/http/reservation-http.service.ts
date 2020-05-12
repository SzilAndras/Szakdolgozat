import {Injectable} from '@angular/core';
import {ReservationInterface} from "../../model/interfaces/reservation.interface";
import {Status} from "../../model/enums/status.enum";
import {AppointmentStatus} from "../../model/enums/appointmentStatus.enum";
import {AppointmentType} from "../../model/enums/appointmentType.enum";
import {ReservationFilterInterface} from "../../model/interfaces/reservation-filter.interface";

@Injectable({
  providedIn: 'root'
})
export class ReservationHttpService {

  constructor() { }

  save(reservation: ReservationInterface) {
    console.log(reservation);
  }

  getUserReservations(){
    // TODO
  }

  getReservationsByAdminStatus(){
    // TODO
  }

  getReservationsByUserStatus(){
    // TODO
  }

  getALlReservation(): ReservationInterface[]{
    return [
      {
        id: 1, adminStatus: Status.ACCEPTED, userStatus: Status.ACCEPTED, plateNumber: 'ASD-123', vehicleType: 'VW' +
          ' golf', userId: 1, vin: 'ASDDSA123', works: [{id:1, periodOfTime: 30, status: Status.ACCEPTED, work:'asd', price:10000}], appointments: [
          {id: 1,
            day: "2020-05-10",
            time: "8:00",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.HANDOVER
          },
          {id: 2,
            day: "2020-05-10",
            time: "14:00",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {id: 3,
            day: "2020-05-11",
            time: "8:00",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {id: 4,
            day: "2020-05-11",
            time: "14:00",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.TAKEOVER
          },
        ], comments: null
      },
      {
        id: 2, adminStatus: Status.PENDING, userStatus: Status.PENDING, plateNumber: 'ASD-123', vehicleType: 'VW' +
          ' golf', userId: 1, vin: 'ASDDSA123', works: [{id:3, periodOfTime: 30, status: Status.ACCEPTED, work:'asd', price:10000}], appointments: [
          {id: 1,
            day: "2020-05-10",
            time: "8:30",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.HANDOVER
          },
          {id: 2,
            day: "2020-05-10",
            time: "14:30",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {id: 3,
            day: "2020-05-11",
            time: "8:30",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {id: 4,
            day: "2020-05-11",
            time: "14:30",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.TAKEOVER
          },
        ], comments: null
      }
    ]
    // TODO
  }

  getReservationsFiltered(filter: ReservationFilterInterface): ReservationInterface[] {
    // TODO
    return [
      {
        id: 1, adminStatus: Status.ACCEPTED, userStatus: Status.ACCEPTED, plateNumber: 'ASD-123', vehicleType: 'VW' +
          ' golf', userId: 1, vin: 'ASDDSA123', works: [{id:1, periodOfTime: 30, status: Status.ACCEPTED, work:'asd', price:10000}], appointments: [
          {id: 1,
            day: "2020-05-10",
            time: "8:00",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.HANDOVER
          },
          {id: 2,
            day: "2020-05-10",
            time: "14:00",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {id: 3,
            day: "2020-05-11",
            time: "8:00",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {id: 4,
            day: "2020-05-11",
            time: "14:00",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.TAKEOVER
          },
        ], comments: null
      },
      {
        id: 2, adminStatus: Status.ACCEPTED, userStatus: Status.PENDING, plateNumber: 'ASD-123', vehicleType: 'VW' +
          ' golf', userId: 1, vin: 'ASDDSA123', works: [{id:3, periodOfTime: 30, status: Status.ACCEPTED, work:'asd', price:10000}], appointments: [
          {id: 5,
            day: "2020-05-10",
            time: "8:30",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.HANDOVER
          },
          {id: 6,
            day: "2020-05-10",
            time: "14:30",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {id: 7,
            day: "2020-05-11",
            time: "8:30",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {id: 8,
            day: "2020-05-11",
            time: "14:30",
            status: AppointmentStatus.SUGGESTED,
            type: AppointmentType.TAKEOVER
          },
        ], comments: null
      }
      ,
      {
        id: 3, adminStatus: Status.REJECTED, userStatus: Status.ACCEPTED, plateNumber: 'ASD-123', vehicleType: 'VW' +
          ' golf', userId: 1, vin: 'ASDDSA123', works: [{id:4, periodOfTime: 30, status: Status.ACCEPTED, work:'asd', price:10000}], appointments: [
          {id: 9,
            day: "2020-05-12",
            time: "8:30",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.HANDOVER
          },
          {id: 10,
            day: "2020-05-12",
            time: "14:30",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {id: 11,
            day: "2020-05-13",
            time: "8:30",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.WORK
          },
          {id: 12,
            day: "2020-05-13",
            time: "14:30",
            status: AppointmentStatus.ACCEPTED,
            type: AppointmentType.TAKEOVER
          },
        ], comments: null
      }
    ]
  }

  revertReservation(reservation: ReservationInterface) {
    // TODO
  }
}
