import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../shared/service/user.service";
import {LoginInterface} from "../../shared/model/interfaces/login.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login: LoginInterface;


  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.login = {username: '', password: ''};
    this.loginForm = this.formBuilder.group({
      username: this.login?.username || '',
      password: this.login?.password || '',
    });
  }

  onLogin(login){
    this.login.username = login.username;
    this.login.password = login.password;

    this.userService.login(this.login);

  }
}
