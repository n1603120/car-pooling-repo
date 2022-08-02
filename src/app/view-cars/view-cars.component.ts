import { Component, OnInit } from '@angular/core';
import {Trip} from "../model/trip";
import {Car} from "../model/car";

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css']
})
export class ViewCarsComponent implements OnInit {
  carArray: Car[] = [];

  ngOnInit(): void {
    this.getAllOwnedCars();
  }

  getAllOwnedCars(): Car[]{
    let carObj = new Car(1, "Ford",
      "MFZ 6342",
      "3",
      "Email",
      "Yes",
      "Yes",
      "Tesco",
      true
    );
    let carObj2 = new Car(1, "Ford",
      "MDZ 6342",
      "1",
      "Phone",
      "Yes",
      "Yes",
      "Tesco",
      false
    );
    this.carArray[0] = carObj;
    this.carArray[1] = carObj2;
    return this.carArray;
  }

  changeActive(currentCar: Car): void {
    this.removeCurrentlyActive();
    currentCar.activeCar = true;
  }

  removeCurrentlyActive() {
    // Back end, find car in owned cars which is active and set to false
  }
}
