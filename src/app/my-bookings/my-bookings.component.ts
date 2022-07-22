import { Component, OnInit } from '@angular/core';
import {Trip} from "../model/trip";
import {Person} from "../model/person";
import {Car} from "../model/car";

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  pageTitle: string = "My Bookings";

  private carObj: Car = {
    ownerId: 1,
    make: "Ford",
    registration: "MFZ 6342",
    numOfSeats: "3",
    preferredContact: "Email",
    smokingOption: true,
    accessibility: "Yes",
    preferredPickUp: "Tesco",
  }

  allBookings: Trip[] = [
    {
      postcode: "bt51",
      destination: "belfast",
      date: "23/08/2001" as unknown as Date,
      time: "19:30",
      car: this.carObj
    },
    {
      postcode: "bt54",
      destination: "dublin",
      date: "23/11/2001" as unknown as Date,
      time: "14:30",
      car: this.carObj
    }
  ]

  onClick() {
    console.log(this.allBookings)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
