import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passenger-results',
  templateUrl: './passenger-results.component.html',
  styleUrls: ['./passenger-results.component.css']
})
export class PassengerResultsComponent implements OnInit {
  pageTitle: string = "Driver Availability";
  drivers: any[] = [
    {"name": "Alfred Hitchcock"},
    {"name": "Bruce Wayne"},
    {"name": "Darth Vader"},
    {"name": "Peter Pan"}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
