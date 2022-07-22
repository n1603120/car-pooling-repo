import {Car} from "./car";

export interface Trip {
  postcode: string;
  destination: string;
  date: string;
  time: string;
  car: Car;
}
