import {Car} from "./car";

export interface Trip {
  postcode: string;
  destination: string;
  date: Date;
  time: string;
  car: Car;
}
