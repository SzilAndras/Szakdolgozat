import { Component, OnInit } from '@angular/core';
import {RegistrationInterface} from "../../shared/model/interfaces/registration.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../shared/service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  reg: RegistrationInterface;
  regForm: FormGroup;

  password1;
  password2;

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.reg = {
      email: '',
      name: '',
      username: '',
      phone: '',
      password: ''
    };
    this.regForm = this.formBuilder.group({
      username: this.reg?.username || '',
      password: this.reg?.password || '',
      email: this.reg?.email || '',
      phone: this.reg?.phone || '',
      name: this.reg?.name || '',
    });
  }

  onSignup(reg) {
    this.reg = reg;
    console.log(this.reg);
    this.userService.registration(this.reg).subscribe(
      res => {
        console.log(res);
      }
    )
  }

}
