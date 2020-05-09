import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { TimeTableComponent } from './time-table/time-table.component';

@NgModule({
  declarations: [TimeTableComponent],
  exports: [
    TimeTableComponent
  ],
  imports: [
    CommonModule,

  ],
  providers: [
  ],
})
export class SharedModule {}
