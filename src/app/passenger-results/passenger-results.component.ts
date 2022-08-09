
import { Component, OnInit } from '@angular/core';
import {Person} from "../model/person";
import {Trip} from "../model/trip";
import {PeopleService} from "../services/person.service";
import {TripService} from "../services/trip.service";
import {HttpClient} from "@angular/common/http";
import {Car} from "../model/car";
import {CarService} from "../services/car.service";
import {delay} from "rxjs";
@Component({
  selector: 'app-passenger-results',
  templateUrl: './passenger-results.component.html',
  styleUrls: ['./passenger-results.component.css']
})
export class PassengerResultsComponent implements OnInit {
  allTrips: Trip[] = [];
  matchedTrips: Trip[] = [];
  unmatchedTrips: Trip[] = [];
  currentTripTowns: string[] = [];
  tripTowns: string[] = [];
  currentTrip!: Trip;

  constructor(private tripService: TripService, private carService: CarService, private peopleService: PeopleService,private http:HttpClient) {

  }

  ngOnInit(): void {
    this.fetchAllTrips();
    //this.fetchCurrentTrip();
    console.log(this.allTrips);
    //this.matchTrips();
  }
  private async fetchAllTrips() {
    this.tripService
      .getAllTrips()
      .subscribe(
        trip => trip.forEach( trip => {
          if(trip.carId != 0 && trip.personId != this.peopleService.currentPerson.id && trip.driverStatus && this.checkDateValid(trip)){
            this.allTrips.push(trip);
          }
        }
      ));
    await this.delay(100);
    this.fetchCurrentTrip();
  }
  // private async checkTripIsDriver(trip: Trip): Promise<boolean> {
  //   const ownedCarArray: Car[] = [];
  //   const carId = trip.carId;
  //   const personId = trip.personId;
  //   console.log(carId);
  //   console.log(personId);
  //   this.carService
  //     .getCarsByOwnerId(personId)
  //     .subscribe(
  //       cars => cars.forEach( car => ownedCarArray.push(car))
  //     )
  //   await this.delay(30);
  //   const result = ownedCarArray.find(car => {return car.id === carId});
  //   console.log(result);
  //   return !!result;
  // }
  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  private fetchCurrentTrip() {
    this.currentTrip = this.tripService.currentTrip;
    const trimmedTowns = this.currentTrip.town.split(",").toString().trim();
    this.currentTripTowns = trimmedTowns.split(",");
    this.matchTrips();
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

  private matchTrips() {
    console.log(this.allTrips);
    this.allTrips.forEach(trip => {
      this.tripTowns = trip.town.split(",");
      console.log(this.tripTowns);
      this.tripTowns.forEach(t => {
        let found = this.currentTripTowns.includes(t);
        if(found){
          if(trip.date === this.currentTrip.date && trip.destination === this.currentTrip.destination ){
            this.matchedTrips.push(trip);
          }
          else{
            this.unmatchedTrips.push(trip);
          }
        }else{
          this.unmatchedTrips.push(trip);
        }
      })
    });
    console.log(this.matchedTrips);
    console.log(this.unmatchedTrips);
  }
}
