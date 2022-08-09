import {Component, OnInit} from '@angular/core';
import {Trip} from "../model/trip";
import {Car} from "../model/car";
import {formatDate} from "@angular/common";
import {TripService} from "../services/trip.service";
import {PeopleService} from "../services/person.service";
import {CarService} from "../services/car.service";
import {Person} from "../model/person";

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
  people: Person[] = [];
  cars: Car[] = [];
  currentCar!: Car;
  currentDriver!: Person;

  constructor(private tripService: TripService, private peopleService: PeopleService, private carService: CarService) { }

  ngOnInit(): void {
    this.fetchAllPeople();
    this.fetchAllCars();
    this.fetchAllTrips();
    console.log(this.allUserTrips);
  }
  private fetchAllPeople() {
    this.peopleService
      .getAllPeople()
      .subscribe(
        people => people.forEach(p => this.people.push(p))
      )
  }
  private fetchAllCars() {
    this.carService
      .getAllCars()
      .subscribe(cars => cars.forEach(c => this.cars.push(c)));
  }
  getDriver(id: number): Person{
    let car = this.cars.find(car => car.id === id);
    // @ts-ignore
    return this.people.find(person => person.id === car.ownerId);

  }
  getCar(id: number): Car{
    // @ts-ignore
    return this.cars.find(car => car.id === id);
  }

  getCurrentDate():string{
    return (new Date()).toISOString().substring(0,10);
  }
  getCurrentTime():String{
    return (new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  checkBooking(booking: Trip): boolean {
    if(!this.showAllBookings){
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

  private async fetchAllTrips() {
    this.tripService
      .getTripsByOwnerId(this.peopleService.currentPerson.id)
      .subscribe(
        trips => trips.forEach(trip => this.allUserTrips.push(trip))
      );
    await this.delay(100);
    this.putTripsInDesc();
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  private putTripsInDesc(){
    console.log(this.allUserTrips);
    this.allUserTrips = this.allUserTrips.sort((x, y) => +new Date(x.date + " " + x.time) - +new Date(y.date+ " " + y.time));
    console.log(this.allUserTrips);
  }


}
