import {Component, OnInit} from '@angular/core';
import {ReservationInterface} from "../../../shared/model/interfaces/reservation.interface";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ReservationService} from "../../../shared/service/reservation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicle-configuration',
  templateUrl: './vehicle-configuration.component.html',
  styleUrls: ['./vehicle-configuration.component.scss']
})

export class VehicleConfigurationComponent implements OnInit {
  reservation: ReservationInterface;
  reservationForm: FormGroup;
  newWork: FormGroup = this.createWork();

  constructor(private formBuilder: FormBuilder, private saveReservationService: ReservationService, private router: Router) {
    this.reservation = this.saveReservationService.getReservation();
  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      type: this.reservation?.vehicleType || '',
      plateNumber: this.reservation?.plateNumber || '',
      vin: this.reservation?.vin || '',
      works: this.formBuilder.array(
        this.reservation?.works?.map(
          work => this.createWork({id: work.id, work: work.work})) || []
      ),
    });

    this.reservationForm.valueChanges.subscribe(
      value => {
        if (this.reservationForm.valid) {
          this.saveReservationService.refreshVehicleConfig(value);
        }
      }
    )
  }

  onSubmit(vehicleData) {
    this.saveReservationService.refreshVehicleConfig(vehicleData);
    this.router.navigate(['reservation/appointment-select']);
  }

  createWork(work?): FormGroup {
    const tempWork = this.formBuilder.group({
      id: work?.id || null,
      work: work?.work || null
    });
    if (work?.id) {
      tempWork.valueChanges.subscribe(v =>
        tempWork.setControl("id", null)
      )
    }
    return tempWork;
  }

  getWorkArrayForm(): FormArray {
    return this.reservationForm.get("works") as FormArray
  }

  addWork() {
    (this.reservationForm.get("works") as FormArray).push(this.newWork);
    this.newWork = this.createWork();
  }

  removeWork(idx: number) {
    (this.reservationForm.get("works") as FormArray).removeAt(idx);
  }

}
