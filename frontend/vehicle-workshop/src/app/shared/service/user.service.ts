import {Injectable} from '@angular/core';
import {UserInterface} from "../model/interfaces/user.interface";
import {UserHttpService} from "./http/user-http.service";
import {LoginInterface} from "../model/interfaces/login.interface";
import {RegistrationInterface} from "../model/interfaces/registration.interface";
import {BehaviorSubject} from "rxjs";
import {UserRoleEnum} from "../model/enums/user-role.enum";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserInterface;


  private loggedInSource = new BehaviorSubject(false);

  loggedIn = this.loggedInSource.asObservable();

  private roleSource = new BehaviorSubject<UserRoleEnum>(UserRoleEnum.GUEST);

  role = this.roleSource.asObservable();



  constructor(private http: UserHttpService, private router: Router) {
    this.getRole();
  }

  login(login: LoginInterface){
    this.http.login(login).subscribe((response) => {
      if (response) {
        this.saveToken(response.headers.get('token'));
        this.router.navigate(['home']);
        this.loggedInSource.next(true);
        this.getRole();
      }
    });
  }

  registration(reg: RegistrationInterface) {
    localStorage.removeItem("token");
    this.http.registration(reg).subscribe(
      () => {
        this.router.navigate(['login']);
      }
    );
  }

  getRole() {
    this.http.getRole().subscribe(
      role => {
        if (role) {
          this.loggedInSource.next(true);
          this.roleSource.next(role);
        }
      }
    );
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['home']);
    this.loggedInSource.next(false);
    this.roleSource.next(UserRoleEnum.GUEST);

  }

  saveToken(token: string) {
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
