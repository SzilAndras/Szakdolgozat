import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AppointmentInterface} from '../model/interfaces/appointment.interface';
import {CellStatus} from './model/cell-status.enum';
import {TimeCellInterface} from './model/time-cell.interface';
import {CellType} from './model/cell-type.enum';
import {TimeByIndex} from './model/time-by-index.enum';
import {TimeTableMode} from './model/time-table-mode.enum';
import {AppointmentStatus} from '../model/enums/appointmentStatus.enum';
import {AppointmentType} from '../model/enums/appointmentType.enum';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit, OnChanges, DoCheck {
  readonly CHOSEN = CellStatus.CHOSEN;
  readonly SELECTED = CellStatus.SELECTED;
  oldWorksLength = 0;
  oldHandover = '';
  oldDate: NgbDate;
  oldMinDate: NgbDate;
  oldMaxDate: NgbDate;

  @Input() mode: TimeTableMode;
  @Input() date: NgbDate;
  @Input() selectedAppointments: AppointmentInterface[] = [];
  @Input() dateAppointments: AppointmentInterface[] = [];
  @Input() minDate: { date: NgbDate, time: TimeByIndex };
  @Input() maxDate: { date: NgbDate, time: TimeByIndex };

  @Output() selected = new EventEmitter<AppointmentInterface[]>();


  reservationAppointments: AppointmentInterface[] = [];

  timeTable: TimeCellInterface[];

  constructor() {
    this.refreshTimeTable();
  }

  ngOnInit() {
    this.refreshTimeTable();

  }

  ngOnChanges(changes: SimpleChanges): void {
/*    const newTime = this.selectedAppointments.find(app => app.type === AppointmentType.HANDOVER)?.time || '';
    if (this.selectedAppointments) {
      this.oldHandover = newTime;
      this.oldWorksLength = this.selectedAppointments.length;
    }
    this.refreshTimeTable();*/

  }

  ngDoCheck(): void {
    const newTime = this.selectedAppointments.find(app => app.type === AppointmentType.HANDOVER)?.time || '';
    if (this.selectedAppointments &&
      (this.oldWorksLength !== this.selectedAppointments.length || this.oldHandover !== newTime) ||
      (this.oldDate && this.oldMaxDate && this.oldMinDate &&
        (!this.oldDate.equals(this.date)  || !this.oldMinDate.equals(this.minDate.date) || !this.oldMaxDate.equals(this.maxDate.date)))
    ) {
      this.oldHandover = newTime;
      this.oldWorksLength = this.selectedAppointments.length;
      this.oldDate = this.date;
      this.oldMaxDate = this.maxDate.date;
      this.oldMinDate = this.minDate.date;
      this.refreshTimeTable();
    }
  }

  initTimeTable() {
    this.timeTable = [];
    for (let i = 0; i < 15; i++) {
      const isOk = this.isDateOk(i);
      this.timeTable.push({
        status: CellStatus.EMPTY,
        type: CellType.EMPTY,
        time: TimeByIndex[i],
        index: i,
        isCurrent: false,
        isSelectable: isOk,
        isDateOk: isOk
      });
    }
  }

  refreshTimeTable() {
    this.initTimeTable();
    for (const appo of this.dateAppointments) {
      const idx = TimeByIndex[appo.time];
      if (appo.date === this.getDay()) {
        this.timeTable[idx] = {
          status: CellStatus.RESERVED,
          type: CellType[appo.type.toString()],
          time: appo.time,
          index: idx,
          isCurrent: false,
          isSelectable: false,
          isDateOk: true
        };
      }
    }

    for (const appo of this.selectedAppointments) {
      const idx = TimeByIndex[appo.time];
      if (appo?.date === this.getDay()) {
        const dateOk = this.isDateOk(idx);
        this.timeTable[idx] = {
          status: this.mode === appo.type.toString() ? CellStatus.CHOSEN : CellStatus.SELECTED,
          type: CellType[appo.type.toString()],
          time: appo.time,
          index: idx,
          isCurrent: true,
          isDateOk: dateOk,
          isSelectable: this.isSelectable(
            idx,
            this.mode === appo.type.toString() ? CellStatus.CHOSEN : CellStatus.SELECTED,
            CellType[appo.type.toString()],
            dateOk)
        };
      }
    }
  }

  isSelectable(idx: number, status: CellStatus, type: CellType, isDateOk: boolean) {
    return isDateOk &&
      (status === 'EMPTY' || (status === CellStatus.CHOSEN && type === this.mode.toString()));
  }

  get gettable() {
    return JSON.stringify(this.timeTable);
  }

  isDateOk(idx: number) {
    if (!this.date || !this.minDate || !this.maxDate) {
      return false;
    }
    const dateIsEqual = (this.minDate.date.equals(this.date) &&  this.minDate.time < idx) ||
      (this.maxDate.date.equals(this.date) &&  this.maxDate.time > idx);
    /* (this.date.year === this.minDate.date.year &&
      this.date.month === this.minDate.date.month &&
      this.date.day === this.minDate.date.day &&
      this.minDate.time <= TimeByIndex[cell.time]) ||
      (this.date.year === this.maxDate.date.year &&
        this.date.month === this.maxDate.date.month &&
        this.date.day === this.maxDate.date.day &&
        this.maxDate.time >= TimeByIndex[cell.time]);*/
    const minIsOk = this.minDate.date.before(this.date);
    /*(this.date.year > this.minDate.date.year ||
      (this.date.year === this.minDate.date.year &&
        (this.date.month > this.minDate.date.month ||
          (this.date.month === this.minDate.date.month &&
            this.date.day > this.minDate.date.day))));*/
    const maxIsOk = this.maxDate.date.after(this.date);


    /*(this.date.year < this.maxDate.date.year ||
      (this.date.year === this.maxDate.date.year &&
        (this.date.month < this.maxDate.date.month ||
          (this.date.month === this.maxDate.date.month &&
            this.date.day < this.maxDate.date.day))));*/
    return (dateIsEqual || (minIsOk && maxIsOk));
  }

  onCellSelected(cell: TimeCellInterface) {
    if (!cell.isSelectable) {
      return;
    }

    const containedIdx = this.selectedAppointments.findIndex(appo =>
      (appo.date === this.getDay() && TimeByIndex[appo.time] === cell.time));
    if (containedIdx === -1) {
      if (this.mode !== TimeTableMode.WORKSELECT) {
        this.selectedAppointments = this.selectedAppointments.filter(appo =>
          appo.type !== AppointmentType[this.mode.toString()]);
      }
      this.selectedAppointments.push(
        {
          id: null,
          date: this.getDay(),
          time: cell.time,
          status: AppointmentStatus.CHOSEN,
          type: AppointmentType[this.mode.toString()]
        });
    } else {
      this.selectedAppointments.splice(containedIdx, 1);
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
        cell.type === CellType.TAKEOVER && (cell.status === CellStatus.SELECTED || cell.status === CellStatus.RESERVED) ? 'Átvétel' :
          cell.type === CellType.HANDOVER ? 'Átadás' :
            'Szabad');
    } else {
      return (!cell.isDateOk ? 'Nem' : cell.isSelectable ? 'Szabad' : 'Foglalt');
    }
  }

  getDay() {
    return this.date.year + '-' +
      (this.date.month < 10 ? '0' + this.date.month : this.date.month) + '-' +
      (this.date.day < 10 ? '0' + this.date.day : this.date.day);
  }

}
