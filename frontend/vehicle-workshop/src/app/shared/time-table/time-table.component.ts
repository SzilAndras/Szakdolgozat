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
export class TimeTableComponent implements OnInit, DoCheck, OnChanges {
  readonly CHOSEN = CellStatus.CHOSEN;
  readonly SELECTED = CellStatus.SELECTED;
  readonly CLOSED = TimeTableMode.CLOSED;


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
  @Input() isReadonly: boolean = false;

  @Output() selected = new EventEmitter<AppointmentInterface[]>();

  timeTable: TimeCellInterface[];

  constructor() {
    this.refreshTimeTable();
  }

  ngOnInit() {
    this.refreshTimeTable();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('dateAppointments') || changes.hasOwnProperty('selectedAppointments') || changes.hasOwnProperty('isReadonly')) {
      this.refreshTimeTable();

    }
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
      this.oldMaxDate = this.maxDate?.date;
      this.oldMinDate = this.minDate?.date;

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
    return !this.isReadonly && isDateOk &&
      (status === 'EMPTY' || (status === CellStatus.CHOSEN && type === this.mode.toString()));
  }

  isDateOk(idx: number) {
    if (!this.date || !this.minDate || !this.maxDate || this.isReadonly) {
      return false;
    }

    const dateIsEqual = (this.minDate.date.equals(this.date) &&
      this.maxDate.date.equals(this.date) &&
      +TimeByIndex[this.minDate.time] < idx &&  +TimeByIndex[this.maxDate.time] > idx);
    const minIsOk = this.minDate.date.before(this.date) || (this.minDate.date.equals(this.date) && +TimeByIndex[this.minDate.time] < idx );
    const maxIsOk = this.maxDate.date.after(this.date) || (this.maxDate.date.equals(this.date) && +TimeByIndex[this.maxDate.time] > idx);
    return (dateIsEqual || (minIsOk && maxIsOk));
  }

  onCellSelected(cell: TimeCellInterface) {
    if (!cell.isSelectable) {
      return;
    }

    const containedIdx = this.selectedAppointments.findIndex(appo =>
      (appo.date === this.getDay() && TimeByIndex[appo.time] === TimeByIndex[cell.time]));

    if (containedIdx === -1) {
      if (this.mode !== TimeTableMode.WORKSELECT && this.mode !== TimeTableMode.CLOSED) {
        this.selectedAppointments = this.selectedAppointments.filter(appo =>
          appo.type !== AppointmentType[this.mode.toString()]);
      }
      this.selectedAppointments.push(
        {
          id: null,
          date: this.getDay(),
          time: cell.time,
          status: AppointmentStatus.CHOSEN,
          type: AppointmentType[this.mode.toString()],
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
        cell.type === CellType.TAKEOVER ? 'Átvétel' :
          cell.type === CellType.HANDOVER ? 'Átadás' :
            cell.type === CellType.CLOSED ? 'Zárva' :
            'Szabad');
    } else {
      return this.mode === TimeTableMode.CLOSED ? 'Nyitva' :
        (!cell.isDateOk ? 'NF' :
          cell.isSelectable ? 'Szabad' :
            cell.type === CellType.CLOSED ? 'Zárva' :
              'Foglalt');
    }
  }

  getDay() {
    return this.date.year + '-' +
      (this.date.month < 10 ? '0' + this.date.month : this.date.month) + '-' +
      (this.date.day < 10 ? '0' + this.date.day : this.date.day);
  }

}
