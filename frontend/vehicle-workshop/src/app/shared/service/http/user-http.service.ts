import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {LoginInterface} from "../../model/interfaces/login.interface";
import {Observable} from "rxjs";
import {RegistrationInterface} from "../../model/interfaces/registration.interface";
import {UserInterface} from "../../model/interfaces/user.interface";
import {UserRoleEnum} from "../../model/enums/user-role.enum";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  readonly url = '/api';


  constructor(private http: HttpClient) { }

  login(login: LoginInterface) {
    return this.http.post<UserInterface>(this.url + '/login', login, {observe: 'response'});
  }

  registration(reg: RegistrationInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.url + '/user/registration', reg);
  }

  getRole(): Observable<UserRoleEnum> {
    return this.http.get<UserRoleEnum>(this.url + '/user/role', {responseType: 'text'});
  }

}
