import { Injectable } from '@angular/core';
import {ReservationInterface} from "../../model/interfaces/reservation.interface";

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

  getALlReservation(){
    // TODO
  }

  revertReservation(reservation: ReservationInterface) {
    // TODO
  }
}
