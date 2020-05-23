import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {InfoInterface} from "../../model/interfaces/info.interface";
import {Observable} from "rxjs";
import {RatingInterface} from "../../model/interfaces/rating.interface";

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
    return this.http.delete<void>(this.url + 'info/delete?id=' + id); // todo
  }

  public getNews(): Observable<[InfoInterface]> { // TODO
    return this.http.get<[InfoInterface]>(this.url + "news");
  }

  getRatings(): Observable<RatingInterface[]> {
    return this.http.get<RatingInterface[]>(this.url + "rating");
  }

  saveRating(rating: RatingInterface) {
    return this.http.post<RatingInterface[]>(this.url + "rating", rating);
  }

}
