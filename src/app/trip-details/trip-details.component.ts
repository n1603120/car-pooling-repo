import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Trip} from "../model/trip";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  //trip!: Trip;

  // Line below needs looked at again
 // @Output() tripEntered = new EventEmitter<Trip>();
  title = 'ReactiveForms';
  tripForm: FormGroup;
  submitted = false;

  // ngOnInit() {
  //   this.tripForm = new FormGroup({
  //     tripPostcode: new FormControl(null),
  //     tripDestination: new FormControl(null),
  //     tripDate: new FormControl(null),
  //     tripTime: new FormControl(null),
  //   })
  // }
  //private trip: Trip;
  onSubmit(): void {
    this.submitted = true;
    console.log(this.tripForm);
    //this.tripEntered.emit(this.trip);
  }
  constructor(private formBuilder: FormBuilder) {
    this.tripForm = formBuilder.group({
      tripPostcode: ['', Validators.required],
      tripDestination: ['', Validators.required],
      tripDate: ['', Validators.required],
      tripTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   // this.updateFromModel(this.trip);
  }
  get registerTripControl() {
    return this.tripForm.controls;
  }
  get getTripPostcode() { return this.tripForm.get('tripPostcode'); }

}
