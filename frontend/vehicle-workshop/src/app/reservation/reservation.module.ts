import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { VehicleConfigurationComponent } from './vehicle-configuration/vehicle-configuration.component';
import { AppointmentSelectComponent } from './appointment-select/appointment-select.component';
import { OverviewComponent } from './overview/overview.component';
import { ReservationHeaderComponent } from './reservation-header/reservation-header.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [ReservationComponent, VehicleConfigurationComponent, AppointmentSelectComponent, OverviewComponent, ReservationHeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ReservationComponent]
})
export class ReservationModule { }
