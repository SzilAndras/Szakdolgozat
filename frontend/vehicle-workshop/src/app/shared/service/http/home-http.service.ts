import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {InfoInterface} from "../../model/interfaces/info.interface";
import {Observable} from "rxjs";
import {RatingInterface} from "../../model/interfaces/rating.interface";
import {NewsInterface} from "../../model/interfaces/news.interface";

@Injectable({
  providedIn: 'root'
})
export class HomeHttpService {

  readonly url = '/api/home/';


  constructor(private http: HttpClient) { }

  public getInfos(): Observable<InfoInterface[]> {
    return this.http.get<InfoInterface[]>(this.url + "info");
  }

  public saveInfo(info: InfoInterface): Observable<InfoInterface> {
    return this.http.post<InfoInterface>(this.url + "info/save", info);
  }

  public removeInfo(id: number): Observable<void> {
    return this.http.delete<void>(this.url + 'info/delete?id=' + id);
  }

  getRatings(): Observable<RatingInterface[]> {
    return this.http.get<RatingInterface[]>(this.url + "rating");
  }

  saveRating(rating: RatingInterface) {
    return this.http.post<RatingInterface[]>(this.url + "rating", rating);
  }

  public getNews(): Observable<NewsInterface[]> { // TODO
    return this.http.get<NewsInterface[]>(this.url + "news");
  }

  public saveNews(news: NewsInterface): Observable<[NewsInterface]> {
    return this.http.post<[NewsInterface]>(this.url + "news/save", news);
  }

  public removeNews(id: number): Observable<void> {
    return this.http.delete<void>(this.url + 'news/delete?id=' + id);
  }

}
