import {Injectable, OnInit} from '@angular/core';
import {ReservationInterface} from "../model/interfaces/reservation.interface";
import {Status} from "../model/enums/status.enum";
import {AppointmentInterface} from "../model/interfaces/appointment.interface";
import {ReservationHttpService} from "./http/reservation-http.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation: ReservationInterface;

  result: BehaviorSubject<boolean> = new BehaviorSubject(false); // todo

  constructor(private http: ReservationHttpService) {
    this.resetReservation();
  }

  reject() {
    if (this.reservation.id) {
      this.http.reject(this.reservation.id).subscribe(
        res => {
          console.log(res);
        }
      )
    }
  }

  accept() {
    if (this.reservation.id) {
      this.http.accept(this.reservation.id).subscribe(
        res => {
          console.log(res);
        }
      )
    }
  }

  suggest() {
    this.http.suggest(this.reservation).subscribe(
      res => {
        console.log(res);
      }
    )
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
      adminStatus: Status.PENDING,
      userStatus: Status.PENDING
    };
  }

  sendReservation(): Observable<ReservationInterface> {
    const resObs = this.http.save(this.reservation);
    this.resetReservation();

    // TODO
    return resObs;
  }

}
