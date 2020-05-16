import {ReservationFilterStatus} from '../enums/reservation-filter-status.enum';

export interface ReservationFilterInterface {
  status: ReservationFilterStatus;
  plateNumber: string;
  type: string;
}
