import { Component, OnInit } from '@angular/core';
import {TripService} from "../services/trip.service";
import {HttpClient} from "@angular/common/http";
import {CarService} from "../services/car.service";

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {

  results: any =[];
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


  constructor(public tripService: TripService,private http:HttpClient, public carService: CarService) {


  }
  ngOnInit(): void {
    // let response = this.http.get("http://localhost:8080/cars")
    // response.subscribe((data)=>this.results=data);
    this.tripService.getAllTrips()
      .subscribe(trips => trips.forEach( trip => this.results.push(trip)))

  }



}
