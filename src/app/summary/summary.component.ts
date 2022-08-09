import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TripService} from "../services/trip.service";
import {CarService} from "../services/car.service";
import {Car} from "../model/car";
import  {PeopleService} from "../services/person.service";
import {Person} from "../model/person";
import {Trip} from "../model/trip";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  pageTitle: string = "Summary Screen";
  currentCar!: Car;
  currentDriver!: Person;
  driverTripSelected!: Trip;
  trips:any;

  constructor(private tripService: TripService, private carService: CarService, private peopleService: PeopleService) { }


  ngOnInit(): void {
    this.fetchDetails()
    console.log(this.currentCar)
    console.log(this.tripService.driverTripSelected)

  }
  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  private async fetchDetails() {
    this.carService.getCarById(this.tripService.driverTripSelected.carId)
      .subscribe(car => this.currentCar = car)
    await this.delay(100);
    this.carService.currentCar = this.currentCar

    this.peopleService.getPersonById(this.currentCar.ownerId)
      .subscribe(person => this.currentDriver = person)

    this.driverTripSelected = this.tripService.driverTripSelected;
  }
}
