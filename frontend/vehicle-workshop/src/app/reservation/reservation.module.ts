import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleConfigurationComponent } from './new-reservation/vehicle-configuration/vehicle-configuration.component';
import { AppointmentSelectComponent } from './new-reservation/appointment-select/appointment-select.component';
import { OverviewComponent } from './new-reservation/overview/overview.component';
import { ReservationHeaderComponent } from './new-reservation/reservation-header/reservation-header.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { UserReservationsComponent } from './user-reservations/user-reservations.component';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { ReservationItemComponent } from './reservation-item/reservation-item.component';
import { ReservationFilterComponent } from './reservation-filter/reservation-filter.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationDetailsComponent } from './user-reservations/reservation-details/reservation-details.component';




@NgModule({
  declarations: [VehicleConfigurationComponent, AppointmentSelectComponent, OverviewComponent, ReservationHeaderComponent, NewReservationComponent, UserReservationsComponent, AdminReservationComponent, ReservationItemComponent, ReservationFilterComponent, ReservationListComponent, ReservationDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    FontAwesomeModule,

  ],
  exports: [NewReservationComponent]
})
export class ReservationModule { }
