import {Status} from "../enums/status.enum";
import {AppointmentInterface} from "./appointment.interface";
import {WorkInterface} from "./work.interface";


export interface ReservationInterface {
  id?: number;

  userId?: number;

  vehicleType: string;

  plateNumber: string;

  vin: string;

  works: WorkInterface[];

  appointments: AppointmentInterface[];

  comments: string[];

  adminStatus: Status;

  userStatus: Status;


}
