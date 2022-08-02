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
  carToBeUpdated!: Car;

  constructor(private readonly router: Router, private peopleService: PeopleService, private carService: CarService) {

  };

  ngOnInit(): void {
    this.fetchAllOwnedCars();
    this.fetchActiveCar();
    console.log(this.ownedCarArray);
  }

  private fetchAllOwnedCars() {
    this.carService
      .getCarsByOwnerId(this.peopleService.currentPerson.id)
      .subscribe(
        cars => cars.forEach( car => this.ownedCarArray.push(car))
      )
  }

  changeActive(currentCar: Car): void {
    if(!currentCar.activeCar){
      //this.updateCar(currentCar);
      this.removeActiveCar(currentCar);
      //currentCar.activeCar = true;
    }
  }

  removeActiveCar(currentCar: Car){
    console.log(this.peopleService.currentPerson.id);
    console.log(this.carToBeUpdated);
    this.carService.getActiveCar(this.peopleService.currentPerson.id)
      .subscribe(car => this.carToBeUpdated = car);
     // .subscribe( cars => cars.forEach(car => this.carToBeUpdated.push(car)));
    console.log(this.carToBeUpdated.activeCar);
    this.updateCar(currentCar);
  }

  fetchActiveCar(){
    this.carService.getActiveCar(this.peopleService.currentPerson.id)
      .subscribe(car => this.carToBeUpdated = car);
  }

  updateCar(currentCar: Car) {
    this.carService
      .update(this.carToBeUpdated)
      .subscribe(id => {
        this.fetchAllOwnedCars();
      }
    );
  }

  // set active to not active and update new car and old car
}
