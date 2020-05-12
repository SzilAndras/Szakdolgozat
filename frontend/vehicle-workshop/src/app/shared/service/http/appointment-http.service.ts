import {Injectable} from '@angular/core';
import {AppointmentInterface} from "../../model/interfaces/appointment.interface";
import {AppointmentStatus} from "../../model/enums/appointmentStatus.enum";
import {AppointmentType} from "../../model/enums/appointmentType.enum";

@Injectable({
  providedIn: 'root'
})
export class AppointmentHttpService {

  constructor() { }

  getAppointmentsByDate(date: ({year: number, month: number, day: number})): AppointmentInterface[] {
    return [
      {id: 1,
          date: "2020-05-10",
          time: "8:00",
          status: AppointmentStatus.ACCEPTED,
          type: AppointmentType.WORK
        },
      {id: 2,
        date: "2020-05-10",
        time: "14:00",
        status: AppointmentStatus.ACCEPTED,
        type: AppointmentType.WORK
      },
      {id: 3,
        date: "2020-05-11",
        time: "8:00",
        status: AppointmentStatus.ACCEPTED,
        type: AppointmentType.WORK
      },
      {id: 4,
        date: "2020-05-11",
        time: "14:00",
        status: AppointmentStatus.ACCEPTED,
        type: AppointmentType.WORK
      },
    ]
    // TODO
    }


}
