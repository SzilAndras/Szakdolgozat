import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {AppointmentType} from "../model/enums/appointmentType.enum";
import {AppointmentInterface} from "../model/interfaces/appointment.interface";
import {CellStatus} from "./model/cell-status.enum";
import {TimeCellInterface} from "./model/time-cell.interface";
import {CellType} from "./model/cell-type.enum";
import {TimeByIndex} from "./model/time-by-index.enum";
import {TimeTableMode} from "./model/time-table-mode.enum";
import {AppointmentStatus} from "../model/enums/appointmentStatus.enum";

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {
  readonly CHOSEN = CellStatus.CHOSEN;

  @Output() selected = new EventEmitter<AppointmentInterface[]>();
  @Input() date: { year: number, month: number, day: number };
  @Input() selectedAppointments: AppointmentInterface[] = [];

  @Input() abelToSelect: CellStatus[] = [CellStatus.EMPTY];
  reservedTimes: TimeCellInterface[] = [];
  @Input() mode: TimeTableMode;


  selectedWorks: AppointmentInterface[] = [];
  @Input() typeFor: AppointmentType = AppointmentType.TAKEOVER;
  @Input() selectFor: AppointmentStatus = AppointmentStatus.SELECTED;

  reservationAppointments: AppointmentInterface[] = [];
  timeTable: TimeCellInterface[];
  selectedAppointment: AppointmentInterface;

  constructor() {
    this.refreshTimeTable();
  }

  ngOnInit() {
    this.mode = TimeTableMode.RESERVATION;
    this.reservedTimes.push({
      status: CellStatus.RESERVED,
      type: CellType.WORK,
      time: TimeByIndex[0],
      index: 0,
      isCurrent: false
    });

    this.refreshTimeTable();

    console.log(this.timeTable);

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('NgOnChange');
    this.refreshTimeTable();
  }

  initTimeTable() {
    this.timeTable = [];
    for (let i = 0; i < 15; i++) {
      this.timeTable.push({
        status: CellStatus.EMPTY,
        type: CellType.EMPTY,
        time: TimeByIndex[i],
        index: i,
        isCurrent: false
      });
    }
  }

  refreshTimeTable() {
    this.initTimeTable();
    for (let time of this.reservedTimes) {
      this.timeTable[time.index] = time;
    }

    for (let appo of this.selectedAppointments) {
      const idx = TimeByIndex[appo.time];
      if (appo.date === this.getDay()) {
        this.timeTable[idx] = {
          status: CellStatus.CHOSEN, type: CellType[appo.type.toString()], time: appo.time, index: idx, isCurrent: true
        };
      }
    }
    //this.getResAppoints();
  }

  isSelectable(idx: number) {
    return this.abelToSelect.includes(this.timeTable[idx].status) || this.timeTable[idx].status === CellStatus.CHOSEN;


    return this.abelToSelect.includes(this.timeTable[idx].status) &&
      ((this.typeFor === AppointmentType.TAKEOVER ?
        this.timeTable[idx].type === CellType.TAKEOVER :
        this.timeTable[idx].type === CellType.EMPTY) ||
        (this.typeFor === AppointmentType.WORK ?
          this.timeTable[idx].type === CellType.WORK && this.timeTable[idx].status === CellStatus.CHOSEN :
          this.timeTable[idx].type === CellType.EMPTY));
  }

  onCellSelected(idx: number) {
    if (this.mode === TimeTableMode.RESERVATION) {
      if (this.isSelectable(idx)) {
        const containedIdx = this.selectedAppointments.findIndex(appo => (appo.date === this.getDay() && TimeByIndex[appo.time] === idx));
        containedIdx !== -1 ? this.selectedAppointments.splice(containedIdx, 1) : this.selectedAppointments.push({
          id: null,
          date: this.getDay(),
          time: TimeByIndex[idx],
          status: AppointmentStatus.SELECTED,
          type: this.typeFor
        });
      }
    }
    this.refreshTimeTable();
    this.emitSelectedAppointments();
  }

  emitSelectedAppointments() {
    this.selected.emit(this.selectedAppointments);
  }

  getCellText(idx: number) {
    const cell = this.timeTable[idx];
    if (cell.isCurrent) {
      return (cell.type === CellType.WORK ? 'Munka' :
        cell.type === CellType.TAKEOVER && (cell.status === CellStatus.CHOSEN || cell.status === CellStatus.RESERVED) ? 'Átvétel' :
          cell.type === CellType.HANDOVER ? 'Átadás' :
            'Szabad');
    } else {
      return (this.isSelectable(idx) ? 'Szabad' : 'Foglalt');
    }
  }

  getDay() {
    return this.date.year + '-' + (this.date.month < 10 ? '0' +  this.date.month :  this.date.month) + '-' + this.date.day;
  }

}
