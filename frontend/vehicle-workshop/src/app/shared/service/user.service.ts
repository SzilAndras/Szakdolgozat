import { Injectable } from '@angular/core';
import {UserInterface} from "../model/interfaces/user.interface";
import {UserHttpService} from "./http/user-http.service";
import {LoginInterface} from "../model/interfaces/login.interface";
import {RegistrationInterface} from "../model/interfaces/registration.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserInterface;

  constructor(private http: UserHttpService) { }

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

  logout() {
    localStorage.removeItem("token");
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

}
