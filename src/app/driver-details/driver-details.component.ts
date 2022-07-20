import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IDriver} from "./driver";

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {
  title = 'ReactiveForms';
  driverForm: FormGroup;
  submitted = false;

  carMake = '';
  reg = '';
  noOfPassengers = 0;
  preferredContact = '';
  smokingOption = false;
  accessibility = '';
  preferredPickUp = '';

  selectedValue: string = '';


  onSubmit(): void {
    this.submitted = true;
    if(!this.driverForm.valid) {
      return;
    }
    console.log(this.driverForm);
  }
  constructor(private formBuilder: FormBuilder) {
    this.driverForm = formBuilder.group({
      driverCarMake: [''],
      driverReg: ['', Validators.required],
      driverNoOfPassengers: ['1', Validators.required],
      driverPreferredContact: ['', Validators.required],
      driverSmokingOption: [''],
      driverAccessibility: [''],
      driverPickUp: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }

}
