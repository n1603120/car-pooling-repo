import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../model/person";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  person!: Person

  constructor(private readonly router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.person = JSON.parse(<string>this.route.snapshot.paramMap.get('currentPerson'));
    console.log(this.person);
    this.populateNameHeader();
  }
  ngOnChanges(){
    console.log(this.person);
  }
  populateNameHeader() {
    if(this.person){
      // @ts-ignore
      document.getElementById("nameBanner").innerText = "Welcome " + this.person.firstName + " " + this.person.lastName;
    }
  }
}
