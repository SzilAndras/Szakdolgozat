import { Injectable } from '@angular/core';
import {RatingInterface} from "../../model/interfaces/rating.interface";

@Injectable({
  providedIn: 'root'
})
export class RatingHttpService {

  constructor() { }

  getRatings(): RatingInterface[] {
    return [{id:1, authorId: 1, authorName: 'Elso Rating', description: 'Minden jó', points: 4}, {id:2, authorId: 2, authorName: 'Gipsz Jakab', description: 'Rossz', points: 1}];
    // todo
  }

  saveRating(rating: RatingInterface) {
    console.log(rating);
  }
}
