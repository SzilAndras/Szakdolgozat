import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {VehicleConfigurationComponent} from "./reservation/vehicle-configuration/vehicle-configuration.component";
import {AppointmentSelectComponent} from "./reservation/appointment-select/appointment-select.component";
import {OverviewComponent} from "./reservation/overview/overview.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path: 'reservation', component: ReservationComponent,
    children: [
      {path: 'vehicle-conf', component: VehicleConfigurationComponent},
      {path: 'appointment-select', component: AppointmentSelectComponent},
      {path: 'overview', component: OverviewComponent},
    ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
