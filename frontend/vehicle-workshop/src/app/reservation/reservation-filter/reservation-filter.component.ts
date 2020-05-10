import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {ReservationFilterInterface} from "../../shared/model/interfaces/reservation-filter.interface";
import {ReservationFilterStatus} from "../../shared/model/enums/reservation-filter-status.enum";

@Component({
  selector: 'app-reservation-filter',
  templateUrl: './reservation-filter.component.html',
  styleUrls: ['./reservation-filter.component.scss']
})
export class ReservationFilterComponent implements OnInit {
  icon = faSearch;
  filter: ReservationFilterInterface;
  @Output() filtered: EventEmitter<ReservationFilterInterface> = new EventEmitter<ReservationFilterInterface>();
  statusOptions = [
    {status: ReservationFilterStatus.ALL, label: 'Mindent mutat'},
    {status: ReservationFilterStatus.PENDING, label: 'Függőben'},
    {status: ReservationFilterStatus.ACCEPTED, label: 'Elfogadva'},
    {status: ReservationFilterStatus.REJECTED, label: 'Elutasítva'}
  ];

  constructor() { }

  ngOnInit(): void {
    this.filter = JSON.parse(localStorage.getItem('reservation-filter'));
    if(!this.filter) {
      this.filter = {status: ReservationFilterStatus.ALL, plateNumber: '', type: ''};
    }
    this.onFilter();
  }

  onFilter() {
    this.filtered.emit(this.filter);
    localStorage.setItem('reservation-filter', JSON.stringify( this.filter));
  }

}
