import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RatingComponent } from './rating/rating.component';
import { InformationsComponent } from './informations/informations.component';
import { NewsComponent } from './news/news.component';
import { RatingItemComponent } from './rating/rating-item/rating-item.component';
import { CreateRatingComponent } from './rating/create-rating/create-rating.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InfoItemComponent } from './informations/info-item/info-item.component';



@NgModule({
  declarations: [HomeComponent, RatingComponent, InformationsComponent, NewsComponent, RatingItemComponent, CreateRatingComponent, InfoItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
