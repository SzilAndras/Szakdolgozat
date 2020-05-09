import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderModule} from "./header/header.module";
import {SharedModule} from "./shared/shared.module";
import {HomeModule} from "./home/home.module";
import {ReservationModule} from "./reservation/reservation.module";
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    SharedModule,
    HomeModule,
    ReservationModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
