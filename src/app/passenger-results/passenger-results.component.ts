
import { Component, OnInit } from '@angular/core';
import {Person} from "../model/person";
import {Trip} from "../model/trip";
import {PeopleService} from "../services/person.service";
import {TripService} from "../services/trip.service";
import {HttpClient} from "@angular/common/http";
import {Car} from "../model/car";
@Component({
  selector: 'app-passenger-results',
  templateUrl: './passenger-results.component.html',
  styleUrls: ['./passenger-results.component.css']
})
export class PassengerResultsComponent implements OnInit {
  pageTitle: string = "Driver Availability";
  allTrips: Trip[] = [];
  matchedTrips: Trip[] = [];
  unmatchedTrips: Trip[] = [];
  currentTrip!: Trip;

  constructor(private tripService: TripService,private peopleService: PeopleService,private http:HttpClient) {

  }

  ngOnInit(): void {
    this.fetchAllTrips();
    this.fetchCurrentTrip();
    console.log(this.allTrips);
  }
  private fetchAllTrips() {
    this.tripService
      .getAllTrips()
      .subscribe(
        trip => trip.forEach( trip => {
          if(trip.carId != 0 && this.checkDateValid(trip)){
            this.allTrips.push(trip);
          }
        }
      ))
  }
  private fetchCurrentTrip() {
    this.currentTrip = this.tripService.currentTrip;
  }
  requestDriver(driver: Trip){
    this.tripService.driverTripSelected = driver;
  }
  getCurrentDate():string{
    return (new Date()).toISOString().substring(0,10);
  }
  getCurrentTime():String{
    return (new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
  checkDateValid(booking: Trip): boolean {
    if(booking.date > this.getCurrentDate()){
      return true;
    }
    else if(booking.date === this.getCurrentDate()){
      return booking.time >= this.getCurrentTime();
    }
    else{
      return false;
    }
  }

}
