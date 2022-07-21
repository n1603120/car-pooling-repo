import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Trip} from "../model/trip";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  title = 'ReactiveForms';
  tripForm: FormGroup;
  submitted = false;

  onSubmit(): void {
    this.submitted = true;
    if(!this.tripForm.valid) {
      return;
    }
    console.log(this.tripForm);
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

  }
}
