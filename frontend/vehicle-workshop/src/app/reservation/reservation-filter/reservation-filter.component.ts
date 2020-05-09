import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-reservation-filter',
  templateUrl: './reservation-filter.component.html',
  styleUrls: ['./reservation-filter.component.scss']
})
export class ReservationFilterComponent implements OnInit {
  @Input() initFilter = {status: 'All', plateNumber: '', type: ''};

  constructor() { }

  ngOnInit(): void {
  }

}
