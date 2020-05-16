import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() page: {last: boolean, first: boolean, totalPages: number, number: number};
  @Output() pagingTo: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPrevious() {
    this.pagingTo.emit(this.page.number - 1);
  }
  onNext() {
    this.pagingTo.emit(this.page.number + 1);
  }

}
