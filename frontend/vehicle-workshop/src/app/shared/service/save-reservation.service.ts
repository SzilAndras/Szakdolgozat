import {Injectable, OnInit} from '@angular/core';
import {ReservationInterface} from "../model/interfaces/reservation.interface";
import {Status} from "../model/enums/status.enum";
import {AppointmentInterface} from "../model/interfaces/appointment.interface";
import {ReservationHttpService} from "./http/reservation-http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SaveReservationService implements OnInit{
  private reservation: ReservationInterface;

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
  }

  public refreshAppointments(appointments: AppointmentInterface[]) {
    this.reservation.appointments = appointments;
  }

  ngOnInit(): void {
    this.resetReservation();
  }

  public getReservation(): ReservationInterface {
    return this.reservation;
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
    }
  }

  sendReservation(): Observable<ReservationInterface> {
    return this.http.save(this.reservation);
  }
}
