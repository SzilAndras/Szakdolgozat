import {AppointmentStatus} from "../enums/appointmentStatus.enum";
import {AppointmentType} from "../enums/appointmentType.enum";

export interface AppointmentInterface {
  id: number;
  day: string;
  time: string;
  status: AppointmentStatus;
  type: AppointmentType;
}
