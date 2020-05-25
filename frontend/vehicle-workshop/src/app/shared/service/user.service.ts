import { Injectable } from '@angular/core';
import {UserInterface} from "../model/interfaces/user.interface";
import {UserHttpService} from "./http/user-http.service";
import {LoginInterface} from "../model/interfaces/login.interface";
import {RegistrationInterface} from "../model/interfaces/registration.interface";
import {BehaviorSubject, Observable} from "rxjs";
import { of } from "rxjs";
import {UserRoleEnum} from "../model/enums/user-role.enum";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserInterface;

  role = of(UserRoleEnum.GUEST);

  loggedIn = new BehaviorSubject(false)



  constructor(private http: UserHttpService, private router: Router) {
    this.getRole().subscribe(
      role => {
        if (role !== UserRoleEnum.GUEST) {
          this.loggedIn.next(true);
        }
      }
    );
  }

  login(login: LoginInterface){
    this.http.login(login).subscribe((response) => {
      if (response) {
        this.saveToken(response.headers.get('token'));
        this.router.navigate(['home']);
        this.loggedIn.next(true);
      }
    });
  }

  registration(reg: RegistrationInterface) {
    localStorage.removeItem("token");
    this.router.navigate(['login']);

    return this.http.registration(reg);
  }

  getRole(): Observable<UserRoleEnum> {
    if (this.getToken() !== null) {
      return this.http.getRole();
    } else {
      return this.role;
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['home']);
    this.loggedIn.next(false);

  }

  saveToken(token: string) {
    console.log(token);
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUser() {
    return this.http.getUser();
  }

  saveUser(user: UserInterface) {
    return this.http.saveUser(user);
  }

  changePass(pass: {oldPass: string, pass0: string, pass1: string}) {
    return this.http.changePass(pass);
  }

}
