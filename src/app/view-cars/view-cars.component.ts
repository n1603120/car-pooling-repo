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
    this.fetchActiveCar();
    this.fetchAllOwnedCars();
   // this.fillRadioAtStart();
    this.removeDuplicateCars();
  }

  private fetchAllOwnedCars() {
    console.log(this.ownedCarArray);
    console.log(this.ownedCarArray.length);
    //if(this.ownedCarArray.length != 0){
     // this.ownedCarArray.forEach(car => this.ownedCarArray.pop());
      this.ownedCarArray.splice(0,this.ownedCarArray.length);
   // }
    this.carService
      .getCarsByOwnerId(this.peopleService.currentPerson.id)
      .subscribe(
        cars => cars.forEach( car => this.ownedCarArray.push(car))
      )
  }

  makeActive(currentCar: Car): void {
    if(!currentCar.activeCar){
      console.log(1);
      this.removeCurrentlyActiveCar();
      currentCar.activeCar = true;
      this.currentlyActiveCar = currentCar;
      this.updateCar(currentCar);
    }
    console.log(currentCar);
    console.log(this.currentlyActiveCar);
    console.log(this.ownedCarArray);
  }

  removeCurrentlyActiveCar(){
    this.currentlyActiveCar.activeCar = false;
    this.setCarToNotActive(this.currentlyActiveCar);
    this.updateCar(this.currentlyActiveCar);
  }

  setCarToNotActive(currentCar: Car) {
    console.log(currentCar);
    //const foundIndex = this.ownedCarArray.findIndex(car => currentCar.carId == car.carId);
    console.log(currentCar.id);
    const foundIndex = this.ownedCarArray.map(car => car.id).indexOf(currentCar.id);
    console.log(foundIndex);
    this.ownedCarArray[foundIndex] = currentCar;
    console.log(this.ownedCarArray);
  }

  private fetchActiveCar(){
    this.carService.getActiveCar(this.peopleService.currentPerson.id)
      .subscribe(car => this.currentlyActiveCar = car);
  }

  updateCar(carToBeUpdated: Car) {
    this.carService
      .update(carToBeUpdated)
      .subscribe((data) => {
          //this.fetchAllOwnedCars();
        }
      );
  }

  // set active to not active and update new car and old car
  fillRadioButton(currentCar: Car) {
    // @ts-ignore
    document.getElementById(currentCar.id).checked = currentCar === this.currentlyActiveCar;
    console.log(2);
  }

  fillRadioAtStart(){
    console.log(this.ownedCarArray);
    console.log(this.ownedCarArray.length);
    //this.ownedCarArray.forEach(car => car.activeCar )
    for(let car of this.ownedCarArray){
      console.log(8);
      if(car.activeCar){
        console.log(car.id);
        // @ts-ignore
        document.getElementById(car.id).checked = true;
        // @ts-ignore
        console.log(document.getElementById(car.id).innerText);
        return;
      }
    }
    // // @ts-ignore
    // const foundIndex = this.ownedCarArray.map(car => car.id).indexOf(this.currentlyActiveCar.id);
    // console.log(foundIndex);
    // //this.ownedCarArray[foundIndex] = currentCar;
    // // @ts-ignore
    // document.getElementById(idOfActiveCar.id).checked = true;
    // console.log(1);
  }

  private removeDuplicateCars() {
    // cors causes in situation where if you have a car clicked then if you click off the page then go back to it quickly, the cars are duplicated
    const uniqueArray = this.ownedCarArray.filter((value, index) => {
      const _value = JSON.stringify(value);
      return index === this.ownedCarArray.findIndex(obj => {
        return JSON.stringify(obj) === _value;
      });
    });
    console.log(uniqueArray);
    //this.ownedCarArray = uniqueArray;
    console.log(this.ownedCarArray);
  }
  // const isPropValuesEqual = (subject, target, propNames) =>
  //   propNames.every(propName => subject[propName] === target[propName]);
  //
  // const getUniqueItemsByProperties = (items, propNames) =>
  //   items.filter((item, index, array) =>
  //     index === array.findIndex(foundItem => isPropValuesEqual(foundItem, item, propNames))
  //   );

}
