import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TimeTableComponent } from './time-table/time-table.component';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [TimeTableComponent, PaginatorComponent],
  exports: [
    TimeTableComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,

  ],
  providers: [
  ],
})
export class SharedModule {}
