import { Component, OnInit } from '@angular/core';
import {TripService} from "../services/trip.service";
import {HttpClient} from "@angular/common/http";
import {CarService} from "../services/car.service";
import {Car} from "../model/car";
import {Person} from "../model/person";
import {PeopleService} from "../services/person.service";

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {

  results: any =[];

  currentCar!: Car;
  currentDriver!: Person;



  constructor(public tripService: TripService,private http:HttpClient, public carService: CarService, public peopleService: PeopleService) {


  }
  ngOnInit(): void {
    this.fetchDetails()


    // let response = this.http.get("http://localhost:8080/cars")
    // response.subscribe((data)=>this.results=data);
    this.tripService.getAll()
      .subscribe(trips => trips.forEach( trip => this.results.push(trip)))

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
