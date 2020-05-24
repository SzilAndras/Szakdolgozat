import {Component, OnInit, ViewChild} from '@angular/core';
import {RatingInterface} from "../../shared/model/interfaces/rating.interface";
import {CreateRatingComponent} from "./create-rating/create-rating.component";
import {HomeHttpService} from "../../shared/service/http/home-http.service";
import {UserService} from "../../shared/service/user.service";
import {UserRoleEnum} from "../../shared/model/enums/user-role.enum";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @ViewChild('newrating') newRatingModal: CreateRatingComponent;

  ratings: RatingInterface[];
  page: number;

  isUser: boolean = false;

  constructor(private ratingHttpService: HomeHttpService, private userService: UserService){}

  ngOnInit() {
    this.page = 0;
    this.ratings = [];
    this.refreshRatings();
    this.refreshRole();

  }

  refreshRole() {
    this.userService.getRole().subscribe(
      role => {
        this.isUser = role === UserRoleEnum.USER;
      }
    )
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
    this.ratingHttpService.getRatings().subscribe(
      ratings => {
        this.ratings = ratings;
      }
    );
    // todo
  }

  openCreateRating() {
    this.newRatingModal.open();
    // TODO
  }

  saveRating(rating) {
    this.ratingHttpService.saveRating(rating).subscribe(
      () => {
        this.refreshRatings();
    }
    );
  }



}
