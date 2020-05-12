import {Component, OnInit, ViewChild} from '@angular/core';
import {RatingInterface} from "../../shared/model/interfaces/rating.interface";
import {RatingHttpService} from "../../shared/service/http/rating-http.service";
import {CreateRatingComponent} from "./create-rating/create-rating.component";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @ViewChild('newrating') newRatingModal: CreateRatingComponent;

  ratings: RatingInterface[];
  page: number;
  showRatingMOdal: boolean = false;

  constructor(private ratingHttpService: RatingHttpService){}

  ngOnInit() {
    this.page = 0;
    this.ratings = [];
    this.refreshRatings();
  }


  nextPage() {
    this.page = (this.page + 1 <= this.ratings.length / 5 ? this.page + 1 : this.page);
    this.refreshRatings();
  }

  previousPage() {
    this.page = (this.page - 1 >= 1 ? this.page - 1 : 0);
    this.refreshRatings();
  }

  refreshRatings() {
    this.ratings = this.ratingHttpService.getRatings();
    // todo
  }

  openCreateRating() {
    this.newRatingModal.open();
    // TODO
  }

  saveRating(rating) {
    this.ratingHttpService.saveRating(rating);
  }

}
