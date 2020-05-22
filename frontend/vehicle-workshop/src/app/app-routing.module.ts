import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {VehicleConfigurationComponent} from './reservation/new-reservation/vehicle-configuration/vehicle-configuration.component';
import {AppointmentSelectComponent} from './reservation/new-reservation/appointment-select/appointment-select.component';
import {OverviewComponent} from './reservation/new-reservation/overview/overview.component';
import {NewReservationComponent} from './reservation/new-reservation/new-reservation.component';
import {UserReservationsComponent} from './reservation/user-reservations/user-reservations.component';
import {AdminReservationComponent} from './reservation/admin-reservation/admin-reservation.component';
import {AdminReservationActualComponent} from './reservation/admin-reservation/admin-reservation-actual/admin-reservation-actual.component';
import {AdminReservationEditComponent} from './reservation/admin-reservation/admin-reservation-edit/admin-reservation-edit.component';
import {LoginComponent} from "./login/login/login.component";
import {RegistrationComponent} from "./login/registration/registration.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'reservation', component: NewReservationComponent,
    children: [
      {path: 'vehicle-conf', component: VehicleConfigurationComponent},
      {path: 'appointment-select', component: AppointmentSelectComponent},
      {path: 'overview', component: OverviewComponent},
    ]},
  {path: 'my-reservations', component: UserReservationsComponent},
  {path: 'view-reservations', component: AdminReservationComponent,
    children: [
      {path: '', component: AdminReservationActualComponent},
      {path: 'actual', component: AdminReservationActualComponent},
      {path: 'edit', component: AdminReservationEditComponent},
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
