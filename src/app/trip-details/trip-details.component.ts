import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Trip} from "../model/trip";
import {createRequiredRegexValidator} from "../utility/validators";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {GoogleMap} from "@angular/google-maps";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  title = 'ReactiveForms';
  tripForm: FormGroup;
  submitted: boolean = false;
  timeValid: boolean = false;
  private dataError: ValidationErrors | null | undefined;

  onSubmit(): void {
    this.submitted = true;
    this.checkTimeValid();
    if(!this.tripForm.valid || this.timeValid) {
      return;
    }
    console.log(this.tripForm);
  }
  constructor(private formBuilder: FormBuilder) {
    this.tripForm = formBuilder.group({
      tripPostcode: ['', createRequiredRegexValidator(/[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}/)],
      tripDestination: ['', Validators.required],
      tripDate: [this.getCurrentDate(), Validators.required],
      tripTime: [this.getCurrentTime(), Validators.required]
    });
  }
  ngOnInit(): void {
  }
  getCurrentDate():string{
    return (new Date()).toISOString().substring(0,10);
  }
  getCurrentTime():string{
    return (new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
  checkTimeValid():void{
    // validates that if the current day is selected, they can't choose a time before the current time
    console.log(this.tripForm.value.tripDate);
    console.log(this.getCurrentDate());
    if(this.tripForm.value.tripDate === this.getCurrentDate()){
      this.timeValid = this.tripForm.value.tripTime >= this.getCurrentTime();
      if(!this.timeValid){
        // @ts-ignore
        document.getElementById("tripTime").style.border = '2pt solid red';
      }
    }
    else{
      this.timeValid = true;
    }
    if(this.timeValid){
      // @ts-ignore
      document.getElementById("tripTime").style.border = '1pt solid black';
    }
  }

  errorPresent(tripData: string): boolean {
    this.dataError = this.tripForm.get(tripData)?.errors
    if(this.dataError){
      // @ts-ignore
      document.getElementById(tripData).style.border = '2pt solid red';
      return true;
    }
    else{
      // @ts-ignore
      document.getElementById(tripData).style.border = '1pt solid black';
      return false;
    }
  }
}
