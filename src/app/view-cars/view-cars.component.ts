import { Component, OnInit } from '@angular/core';
import {Trip} from "../model/trip";
import {Car} from "../model/car";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {PeopleService} from "../services/person.service";
import {createRequiredRegexValidator} from "../utility/validators";
import {CarService} from "../services/car.service";
import {Observable, take} from "rxjs";

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css']
})
export class ViewCarsComponent implements OnInit {
  ownedCarArray: Car[] = [];
  currentlyActiveCar!: Car;

  constructor(private readonly router: Router, private peopleService: PeopleService, private carService: CarService) {

  };

  ngOnInit(): void {
    this.fetchAllOwnedCars();
    this.fetchActiveCar();
    console.log(this.ownedCarArray);
    this.fillRadioButton();
  }

  private fetchAllOwnedCars() {
    console.log(5);
    if(this.ownedCarArray.length != 0){
      this.ownedCarArray.forEach(car => this.ownedCarArray.pop());
    }
    this.carService
      .getCarsByOwnerId(this.peopleService.currentPerson.id)
      .subscribe(
        cars => cars.forEach( car => this.ownedCarArray.push(car))
      )
  }

  makeActive(currentCar: Car): void {
    console.log(currentCar);
    console.log(this.currentlyActiveCar);
    if(!currentCar.activeCar){
      console.log(1);
      this.removeCurrentlyActiveCar();
      currentCar.activeCar = true;
      this.updateCar(currentCar);
    }
    console.log(currentCar);
    console.log(this.currentlyActiveCar);
  }

  removeCurrentlyActiveCar(){
    this.carService.getActiveCar(this.peopleService.currentPerson.id)
      .subscribe(car => this.currentlyActiveCar = car);
    this.currentlyActiveCar.activeCar = false;
    this.updateCar(this.currentlyActiveCar);
  }

  fetchActiveCar(){
    this.carService.getActiveCar(this.peopleService.currentPerson.id)
      .subscribe(car => this.currentlyActiveCar = car);
  }

  updateCar(carToBeUpdated: Car) {
    this.carService
      .update(carToBeUpdated)
      .subscribe();
  }

  // set active to not active and update new car and old car
  private fillRadioButton() {

  }
}
