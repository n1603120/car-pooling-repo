import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passenger-results',
  templateUrl: './passenger-results.component.html',
  styleUrls: ['./passenger-results.component.css']
})
export class PassengerResultsComponent implements OnInit {
  pageTitle: string = "Driver Availability";
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
  constructor() { }

  ngOnInit(): void {
  }

}

