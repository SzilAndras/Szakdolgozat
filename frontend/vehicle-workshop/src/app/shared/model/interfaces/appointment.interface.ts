import {AppointmentStatus} from "../enums/appointmentStatus.enum";
import {AppointmentType} from "../enums/appointmentType.enum";

export interface AppointmentInterface {
  id: number;
  date: string;
  time: string;
  status: AppointmentStatus;
  type: AppointmentType;
}
