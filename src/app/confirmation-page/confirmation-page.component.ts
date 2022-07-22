import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {

  summary2: any[] = [
    {"name": "Driver name: Bruce Wayne"},
    {"name": "Car Make: Audi"},
    {"name": "Driver Registration: WUI 9999"},
    {"name": "Passenger numbers:   4"},
    {"name": "Preferred contact Method: E-mail"},
    {"name": "Smoking Option:  Yes"},
    {"name": "Car Accessible: Yes"},
    {"name": "Preferred Pick up Point: Tesco"},
  ]


  constructor() { }



  ngOnInit(): void {
  }

}
