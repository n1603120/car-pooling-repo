import {Car} from "./car";

export class Trip {
  postcode: string = "";
  town: string = "";
  destination: string ="";
  date: string = "";
  time: string = "";
  car: Car = new Car(0, "", "", "","", "", "","",false);

constructor(postcode: string, town:string, destination: string,date: string,time: string ) {
  this.postcode = postcode;
  this.town = town;
  this.destination = destination;
  this.date = date;
  this.time = time;
}

}
