import {Car} from "./car";

export class Trip {
  id: number;
  personId: number;
  postcode: string;
  town: string;
  destination: string;
  date: string;
  time: string;
  carId: number;

constructor(personId: number, postcode: string, town:string, destination: string,date: string,time: string, carId: number ) {
  this.id = 0;
  this.personId = personId;
  this.postcode = postcode;
  this.town = town;
  this.destination = destination;
  this.date = date;
  this.time = time;
  this.carId = carId;
}
}
