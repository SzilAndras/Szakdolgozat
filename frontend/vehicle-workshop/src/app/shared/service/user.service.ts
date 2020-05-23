import { Injectable } from '@angular/core';
import {UserInterface} from "../model/interfaces/user.interface";
import {UserHttpService} from "./http/user-http.service";
import {LoginInterface} from "../model/interfaces/login.interface";
import {RegistrationInterface} from "../model/interfaces/registration.interface";
import {Observable, ReplaySubject} from "rxjs";
import {UserRoleEnum} from "../model/enums/user-role.enum";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserInterface;

  asd = of(UserRoleEnum.GUEST);



  constructor(private http: UserHttpService) {

  }

  login(login: LoginInterface){
    this.http.login(login).subscribe((response) => {
      if (response) {
        this.saveToken(response.headers.get('token'));
      }
    });
  }

  registration(reg: RegistrationInterface) {
    localStorage.removeItem("token");
    return this.http.registration(reg);
  }

  getRole(): Observable<UserRoleEnum> {
    if (this.getToken() !== null) {
      return this.http.getRole();
    } else {
      return this.asd;
    }
  }

  logout() {
    localStorage.removeItem("token");
  }

  saveToken(token: string) {
    console.log(token);
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

}
