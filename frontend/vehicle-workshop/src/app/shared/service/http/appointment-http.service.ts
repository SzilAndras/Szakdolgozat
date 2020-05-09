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
      day: "2020-05-09",
      time: "8:00",
      status: AppointmentStatus.ACCEPTED,
      type: AppointmentType.WORK
      },
      {id: 2,
        day: "2020-05-09",
        time: "14:00",
        status: AppointmentStatus.ACCEPTED,
        type: AppointmentType.WORK
      },
    ]
    // TODO
    }


}
