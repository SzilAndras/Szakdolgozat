import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RatingComponent } from './rating/rating.component';
import { InformationsComponent } from './informations/informations.component';
import { NewsComponent } from './news/news.component';
import { RatingItemComponent } from './rating/rating-item/rating-item.component';
import { CreateRatingComponent } from './rating/create-rating/create-rating.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [HomeComponent, RatingComponent, InformationsComponent, NewsComponent, RatingItemComponent, CreateRatingComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
