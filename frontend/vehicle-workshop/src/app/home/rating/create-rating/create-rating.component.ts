import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {RatingInterface} from "../../../shared/model/interfaces/rating.interface";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-rating',
  templateUrl: './create-rating.component.html',
  styleUrls: ['./create-rating.component.scss']
})
export class CreateRatingComponent implements OnInit {
  @ViewChild('content') content;
  @Output() saveRating: EventEmitter<RatingInterface> = new EventEmitter<RatingInterface>();
  ratingModal: NgbModalRef;

  pointOptions = [
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4},
    {value: 5},
  ];

  constructor(private modalService: NgbModal) { }



  ngOnInit(): void {
  }

  open() {
    this.ratingModal= this.modalService.open(this.content);
  }

  onSave(rating) {
    this.saveRating.emit(rating);
    this.ratingModal.close();
  }
}
