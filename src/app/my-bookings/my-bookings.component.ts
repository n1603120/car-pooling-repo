import {Component, OnInit} from '@angular/core';
import {Trip} from "../model/trip";
import {Car} from "../model/car";
import {formatDate} from "@angular/common";
import {TripService} from "../services/trip.service";
import {PeopleService} from "../services/person.service";

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  pageTitle: string = "My Bookings";
  currentlyActiveText: string = "Currently Active Bookings";
  displayAllText: string = "All Bookings";
  toggleTitle: string = this.currentlyActiveText;
  changeDisplayAllText: string = "Change To Display All Bookings";
  changeCurrentlyActiveText: string = "Change To Currently Active Bookings";
  toggleText: string = this.changeDisplayAllText;
  showAllBookings: boolean | undefined;
  allUserTrips: Trip[] = [];

  constructor(private tripService: TripService, private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.fetchAllTrips();
    console.log(this.allUserTrips);
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

  private fetchAllTrips() {
    this.tripService
      .getTripsByOwnerId(this.peopleService.currentPerson.id)
      .subscribe(
        trips => trips.forEach(trip => this.allUserTrips.push(trip))
      )
  }
}
