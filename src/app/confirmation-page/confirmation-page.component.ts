import { Component, OnInit } from '@angular/core';
import {TripService} from "../services/trip.service";
import {HttpClient} from "@angular/common/http";
import {CarService} from "../services/car.service";
import {Car} from "../model/car";
import {Person} from "../model/person";
import {PeopleService} from "../services/person.service";
import {Trip} from "../model/trip";

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {

  results: any =[];
  currentCar!: Car;
  currentDriver!: Person;
  driverTripSelected!: Trip;
  // summary2: any[] = [
  //   {"name": "Driver name: Bruce Wayne"},
  //   {"name": "Car Make: Audi"},
  //   {"name": "Driver Registration: WUI 9999"},
  //   {"name": "Passenger numbers:   4"},
  //   {"name": "Preferred contact Method: E-mail"},
  //   {"name": "Smoking Option:  Yes"},
  //   {"name": "Car Accessible: Yes"},
  //   {"name": "Preferred Pick up Point: Tesco"},
  // ]


  constructor(public tripService: TripService,private http:HttpClient, public carService: CarService, private peopleService: PeopleService) {


  }
  ngOnInit(): void {
    // let response = this.http.get("http://localhost:8080/cars")
    // response.subscribe((data)=>this.results=data);
    this.fetchDetails()
    this.tripService.getAllTrips()
      .subscribe(trips => trips.forEach( trip => this.results.push(trip)))

  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  private async fetchDetails()
  {
    this.carService.getCarById(this.tripService.driverTripSelected.carId)
      .subscribe(car => this.currentCar = car)
    await this.delay(100);
    this.carService.currentCar = this.currentCar

    this.peopleService.getPersonById(this.currentCar.ownerId)
      .subscribe(person => this.currentDriver = person)

    this.driverTripSelected = this.tripService.driverTripSelected;
  }

  onSubmit(){
    this.tripService.currentTrip.carId = this.tripService.driverTripSelected.carId
    console.log(this.tripService.currentTrip.carId)
    this.tripService.addTrip(this.tripService.currentTrip).subscribe((data) => {});
  }



}
