import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/service/user.service";
import {UserRoleEnum} from "../shared/model/enums/user-role.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean = false;
  isAdmin: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.loggedIn.subscribe(
      is => {
        this.isLogin = is;
      }
    );
    this.userService.role.subscribe(
      role => {
        this.isAdmin = UserRoleEnum.ADMIN === role;
      }
    );
  }

  onLogout() {
    this.userService.logout();
  }

}
