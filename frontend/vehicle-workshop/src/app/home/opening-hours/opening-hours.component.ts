import {Component, OnInit} from '@angular/core';
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {AppointmentInterface} from "../../shared/model/interfaces/appointment.interface";
import {NgbCalendar, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {AppointmentHttpService} from "../../shared/service/http/appointment-http.service";
import {UserService} from "../../shared/service/user.service";
import {UserRoleEnum} from "../../shared/model/enums/user-role.enum";

@Component({
  selector: 'app-opening-hours',
  templateUrl: './opening-hours.component.html',
  styleUrls: ['./opening-hours.component.scss']
})
export class OpeningHoursComponent implements OnInit {

  faCalendar = faCalendarAlt;
  appointments: AppointmentInterface[] = [];
  dateAppointments: AppointmentInterface[] = [];
  model: NgbDate;

  isAdmin: boolean = false;




  constructor(private calendar: NgbCalendar,
              private appointmentService: AppointmentHttpService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getRole().subscribe(
      role =>  this.isAdmin = role === UserRoleEnum.ADMIN
    );
    this.userService.loggedIn.subscribe(
      isLoggedIn => {
        if (!isLoggedIn) {
          this.isAdmin = false;
        }
      }
    );
    this.model = this.calendar.getNext(this.calendar.getToday(), 'd', 15);
/*
    this.getDateAppointments();
*/
    this.getDateClosedAppointments();

  }

  get minDateTime(): {date: NgbDate, time: string} {
    return {date: this.calendar.getNext(this.calendar.getToday(), 'd', 1), time: '15:00'};
  }

  get maxDateTime(): {date: NgbDate, time: string} {
    return {date: this.calendar.getNext(this.calendar.getToday(), 'y', 1), time: '8:00'};
  }

  get date() {
    return this.model.year + '-' +
      (this.model.month < 10 ? '0' +  this.model.month :  this.model.month) + '-' +
      (this.model.day < 10 ? '0' +  this.model.day :  this.model.day);
  }

  onDateChanged(date) {
    this.model = date;
/*
    this.getDateAppointments();
*/
    this.getDateClosedAppointments();
  }

  getDateAppointments() {
    this.appointmentService.getAppointmentsByDate(this.date).subscribe(
      appo => this.dateAppointments = appo
    );
  }

  getDateClosedAppointments() {
    this.appointmentService.getClosedAppointmentsByDate(this.date).subscribe(
      appo => this.appointments = appo
    );
  }

  appointmentsSelected(appos: AppointmentInterface[]) {
    this.appointments = appos;
  }

  onSave() {
    this.appointmentService.saveClosedAppointments(this.appointments).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }

}
