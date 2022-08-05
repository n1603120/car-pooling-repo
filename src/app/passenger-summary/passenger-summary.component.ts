import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TripService} from "../services/trip.service";
import {CarService} from "../services/car.service";
import {Car} from "../model/car";
import  {PeopleService} from "../services/person.service";
import {Person} from "../model/person";

@Component({
  selector: 'app-passenger-summary',
  templateUrl: './passenger-summary.component.html',
  styleUrls: ['./passenger-summary.component.css']
})
export class PassengerSummaryComponent implements OnInit {
  pageTitle: string = "Summary Screen";
  currentCar!: Car;
  currentDriver!: Person;


  trips:any;
  // drivers: any[] = [
  //   {"name": "Alfred Hitchcock"},
  //   {"name": "Bruce Wayne"},
  //   {"name": "Darth Vader"},
  //   {"name": "Peter Pan"}
  // ]
  //
  // summary1: any[] = [
  //   {"name": "Driver name: Bruce Wayne"},
  //   {"name": "Driver Registration: WUI 9999"},
  //   {"name": "Pick up point:   Nerwy"},
  //   {"name": "pick location: Nerwy"},
  //   {"name": "Pick up time:  10:00am"},
  //   {"name": "Return: no"}
  // ]
  onClick() {
    // console.log(this.drivers)
  }
  // constructor(private http:HttpClient) { }
  //
  //
  // ngOnInit(): void {
  //
  //   let response = this.http.get("http://localhost:8080/people")
  //   response.subscribe((data)=>this.trips=data);
  //
  //
  //
  // }
  constructor(private http:HttpClient, public tripService: TripService, public carService: CarService, public peopleService: PeopleService) { }


  ngOnInit(): void {
    this.fetchDetails()
    console.log(this.currentCar)
    console.log(this.tripService.currentTrip)

    // let response = this.http.get("http://localhost:8080/people")
    // response.subscribe((data)=>this.trips=data);
    // console.log(this.tripService.currentTrip)
    // this.tripService.currentTrip
  }
  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  private async fetchDetails()
    {
      this.carService.getCarById(this.tripService.currentTrip.carId)
        .subscribe(car => this.currentCar = car)
      await this.delay(100);
      this.carService.currentCar = this.currentCar

      this.peopleService.getPersonById(this.currentCar.ownerId)
        .subscribe(person => this.currentDriver = person)
    }

}
