import {Injectable, OnInit} from '@angular/core';
import {ReservationInterface} from "../model/interfaces/reservation.interface";
import {Status} from "../model/enums/status.enum";
import {AppointmentInterface} from "../model/interfaces/appointment.interface";
import {ReservationHttpService} from "./http/reservation-http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation: ReservationInterface;
  private result = new Observable();

  constructor(private http: ReservationHttpService) {
    this.resetReservation();
  }

  public refreshVehicleConfig(config: {type?: string, vin?: string, plateNumber?: string, works?: [{id?: number, work?: string}]}) {
    this.reservation.vehicleType = config?.type;
    this.reservation.vin = config?.vin;
    this.reservation.plateNumber = config?.plateNumber;
    this.reservation.works = config?.works.map(work => ({
      id: work.id,
      work: work.work,
      periodOfTime: undefined,
      price: undefined,
      status: Status.PENDING
    }));
    console.log(this.reservation);
  }

  public refreshAppointments(appointments: AppointmentInterface[]) {
    this.reservation.appointments = appointments;
  }

  public getReservation(): ReservationInterface {
    return this.reservation;
  }

  public setReservation(res: ReservationInterface) {
    this.reservation = res;
  }

  private resetReservation(): void{
    this.reservation = {
      id: null,
      userId: null,
      vehicleType: '',
      plateNumber: '',
      vin: '',
      works: [],
      appointments: [],
      comments: [],
      adminStatus: Status.PENDING,
      userStatus: Status.PENDING
    };
  }

  sendReservation(): Observable<ReservationInterface> {
    const resObs = this.http.save(this.reservation);
    resObs.subscribe(
      res => {
      }
    )
    this.resetReservation();

    // TODO
    return resObs;
  }
}
