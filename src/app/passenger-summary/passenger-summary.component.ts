import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passenger-summary',
  templateUrl: './passenger-summary.component.html',
  styleUrls: ['./passenger-summary.component.css']
})
export class PassengerSummaryComponent implements OnInit {
  pageTitle: string = "Summary Screen";



  drivers: any[] = [
    {"name": "Alfred Hitchcock"},
    {"name": "Bruce Wayne"},
    {"name": "Darth Vader"},
    {"name": "Peter Pan"}
  ]

  summary1: any[] = [
    {"name": "Driver name: Bruce Wayne"},
    {"name": "Driver Registration: YHAN764"},
    {"name": "Pick up point:   Nerwy"},
    {"name": "pick location: Nerwy"},
    {"name": "Pick up time:  10:00am"},
    {"name": "Return: no"}
  ]
  onClick() {
    console.log(this.drivers)
  }
  constructor() { }



  ngOnInit(): void {




  }

}
