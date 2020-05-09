import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {VehicleConfigurationComponent} from "./reservation/new-reservation/vehicle-configuration/vehicle-configuration.component";
import {AppointmentSelectComponent} from "./reservation/new-reservation/appointment-select/appointment-select.component";
import {OverviewComponent} from "./reservation/new-reservation/overview/overview.component";
import {NewReservationComponent} from "./reservation/new-reservation/new-reservation.component";
import {UserReservationsComponent} from "./reservation/user-reservations/user-reservations.component";
import {AdminReservationComponent} from "./reservation/admin-reservation/admin-reservation.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path: 'reservation', component: NewReservationComponent,
    children: [
      {path: 'vehicle-conf', component: VehicleConfigurationComponent},
      {path: 'appointment-select', component: AppointmentSelectComponent},
      {path: 'overview', component: OverviewComponent},
    ]},
  {path: 'my-reservations', component: UserReservationsComponent},
  {path: 'view-reservations', component: AdminReservationComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
