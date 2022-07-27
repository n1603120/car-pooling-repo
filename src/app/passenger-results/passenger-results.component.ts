import { Component, OnInit } from '@angular/core';
import {Person} from "../model/person";
import {Trip} from "../model/trip";
import {PeopleService} from "../services/person.service";
import {TripService} from "../services/trip.service";

@Component({
  selector: 'app-passenger-results',
  templateUrl: './passenger-results.component.html',
  styleUrls: ['./passenger-results.component.css']
})
export class PassengerResultsComponent implements OnInit {
  pageTitle: string = "Driver Availability";
  allTrips: Trip[] = [];
  drivers: any[] = [

    {"name": "Bruce Wayne"},

  ]
  drivers1: any[] = [

    {"name": "Bruce Wayne"},
  ]
  drivers2: any[] = [
    {"name": "Alfred Hitchcock"},

  ]
  drivers3: any[] = [
    {"name": "Darth Vader"},

  ]
  drivers4: any[] = [
    {"name": "Peter Pan"}
  ]
  constructor(private tripService: TripService) {

  }

  ngOnInit(): void {
    this.fetchAllTrips();
    console.log(this.allTrips);
  }
  private fetchAllTrips() {
    this.tripService
      .getAllTrips()
      .subscribe(
        trip => trip.forEach( trip => this.allTrips.push(trip))
      )
  }
}

