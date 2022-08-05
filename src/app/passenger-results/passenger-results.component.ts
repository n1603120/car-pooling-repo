// import { Component, OnInit } from '@angular/core';
// import {Person} from "../model/person";
// import {Trip} from "../model/trip";
// import {PeopleService} from "../services/person.service";
// import {TripService} from "../services/trip.service";
// import {HttpClient} from "@angular/common/http";
//
// @Component({
//   selector: 'app-passenger-results',
//   templateUrl: './passenger-results.component.html',
//   styleUrls: ['./passenger-results.component.css']
// })
// export class PassengerResultsComponent implements OnInit {
//   pageTitle: string = "Driver Availability";
//   people:any;
//   personName:any;
//   allTrips: Trip[] = [];
//   // drivers: any[] = [
//   //
//   //   {"name": "Bruce Wayne", "town": "Saintfield"},
//   //   {"name": "Bruce Wayne", "town": "Saintfield"},
//   //   {"name": "Alfred Hitchcock", "town": "Newcastle"},
//   //   {"name": "Darth Vader", "town": "Bangor"},
//   //   {"name": "Peter Pan", "town": "Carryduff"}
//   // ]
//
//   constructor(private tripService: TripService,private peopleService: PeopleService,private http:HttpClient) {
//
//   }
//
//   ngOnInit(): void {
//     this.fetchAllTrips();
//     console.log(this.allTrips);
//
//     let response1 = this.http.get("http://localhost:8080/trips")
//     response1.subscribe((data)=>this.people=data);
//
//     let response = this.http.get("http://localhost:8080/people")
//     response.subscribe((data)=>this.personName=data);
//
//   }
//   private fetchAllTrips() {
//     this.tripService
//       .getAllTrips()
//       .subscribe(
//         trip => trip.forEach( trip => this.allTrips.push(trip))
//       )
//   }
// }

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
  people: Trip[] = [];
  personName:any;
  allTrips: Trip[] = [];
  driver: Trip[] = [];
  // drivers: any[] = [
  //
  //   {"name": "Bruce Wayne", "town": "Saintfield"},
  //   {"name": "Bruce Wayne", "town": "Saintfield"},
  //   {"name": "Alfred Hitchcock", "town": "Newcastle"},
  //   {"name": "Darth Vader", "town": "Bangor"},
  //   {"name": "Peter Pan", "town": "Carryduff"}
  // ]
  constructor(private tripService: TripService,private peopleService: PeopleService,private http:HttpClient) {

  }

  ngOnInit(): void {
    this.fetchAllTrips();
    console.log(this.allTrips);
    // let response1 = this.http.get("http://localhost:8080/trips")    // response1.subscribe((data)=>this.people=data);
    this.tripService.getAll()
      .subscribe(trips => trips.forEach( trip => this.people.push(trip)))
    // console.log(this.people[0])
    // let response = this.http.get("http://localhost:8080/people")    // response.subscribe((data)=>this.personName=data);
  }
  private fetchAllTrips() {
    this.tripService
      .getAllTrips()
      .subscribe(
        trip => trip.forEach( trip => this.allTrips.push(trip))
      )
  }
  // constructor(id: number, postcode: string, town:string, destination: string,date: string,time: string, car: Car)
  addTrip(driver: Trip){
    // let t = new Trip(1, "town", "destination",
    //   "date",
    //   "this");
    // this.driver.push(driver.name);
    this.tripService.currentTrip = driver
    // console.log(driver)
    // console.log(this.tripService.currentTrip)
    // console.log(driver)
    // console.log(this.driver)
    // console.log(driver)
    // this.tripService.currentTrip
  }
}
