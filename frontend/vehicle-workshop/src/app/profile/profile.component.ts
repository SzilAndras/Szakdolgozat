import { Component, OnInit } from '@angular/core';
import {UserInterface} from "../shared/model/interfaces/user.interface";
import {UserService} from "../shared/service/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  profile: UserInterface;

  passForm: FormGroup;

  constructor(private service: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initPassForm();
    this.service.getUser().subscribe(
      user => {
        this.profile = user;
        this.refreshUser();
      }
    );
  }

  refreshUser() {
    console.log(this.profile);
    this.form = this.formBuilder.group({
      email: this.profile.email || '',
      phone: this.profile.phone || '',
      fullName: this.profile.fullName || '',
    });
    console.log(this.form);
  }

  initPassForm() {
    this.passForm = this.formBuilder.group({
      oldPass: '',
      pass0: '',
      pass1: ''
    }


    )
  }

  onSave() {
    this.profile.fullName = this.form.get('fullName').value;
    this.profile.email = this.form.get('email').value;
    this.profile.phone = this.form.get('phone').value;

    console.log(this.profile);

    this.service.saveUser(this.profile).subscribe(
      user => {
        this.profile = user;
        this.refreshUser();
      }
    )
  }

  onPasswordChanged() {
    this.service.changePass({
      oldPass: this.passForm.get('oldPass').value,
      pass0: this.passForm.get('pass0').value,
      pass1: this.passForm.get('pass1').value
    }).subscribe(
      (res) => {
        this.initPassForm();
        if (res) {
          this.service.logout();
        }
      }
    )
  }

}
