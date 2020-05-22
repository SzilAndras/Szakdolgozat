import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TimeTableComponent } from './time-table/time-table.component';
import { PaginatorComponent } from './paginator/paginator.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./service/http/auth-interceptor";

@NgModule({
  declarations: [TimeTableComponent, PaginatorComponent],
  exports: [
    TimeTableComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
})
export class SharedModule {}
