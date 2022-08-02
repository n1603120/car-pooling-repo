import {Component, OnInit} from '@angular/core';
import {Trip} from "../model/trip";
import {Car} from "../model/car";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  pageTitle: string = "My Bookings";
  showAllBookings: boolean | undefined;
  currentlyActiveText: string = "Currently Active Bookings";
  displayAllText: string = "All Bookings";
  toggleTitle: string = this.currentlyActiveText;
  changeDisplayAllText: string = "Change To Display All Bookings";
  changeCurrentlyActiveText: string = "Change To Currently Active Bookings";
  toggleText: string = this.changeDisplayAllText;

  carObj = new Car(1, 1,"Ford",
    "MFZ 6342",
    "3",
    "Email",
    "yes",
    "Yes",
    "Tesco",
    true
  );


  allBookings: Trip[] = [
    {
      postcode: "bt51",
      town: "Carryduff",
      destination: "belfast",
      date: "2020-07-22",
      time: "18:30",
      car: this.carObj
    },
    {
      postcode: "bt54",
      town: "Belfast",
      destination: "dublin",
      date: "2044-08-23",
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
  getCurrentDate():string{
    return (new Date()).toISOString().substring(0,10);
  }
  getCurrentTime():String{
    return (new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  checkBooking(booking: Trip): boolean {
    if(!this.showAllBookings){
      console.log(booking.date);
      console.log(this.getCurrentDate())
      if(booking.date > this.getCurrentDate()){
        return true;
      }
      else if(booking.date === this.getCurrentDate()){
        return booking.time >= this.getCurrentTime();
      }
      else{
        return false;
      }
    }else{
      return true;
    }
  }

  toggleTable(): void{
    console.log(this.showAllBookings);
    if(this.showAllBookings) {
      this.showAllBookings = false;
      this.toggleText = this.changeDisplayAllText;
      this.toggleTitle = this.currentlyActiveText
    }else{
      this.showAllBookings = true;
      this.toggleText = this.changeCurrentlyActiveText;
      this.toggleTitle = this.displayAllText;
    }
  }
}
