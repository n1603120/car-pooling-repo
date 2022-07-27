import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../model/person";
import {ActivatedRoute, Router} from "@angular/router";
import {PeopleService} from "../services/person.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  person!: Person

  constructor(private readonly router: Router, private peopleService: PeopleService ) {
  }

  ngOnInit(): void {
    this.getCurrentPerson();
    this.populateNameHeader();
  }
  private populateNameHeader(): void{
    if(this.person){
      // @ts-ignore
      document.getElementById("nameBanner").innerText = "Welcome " + this.person.firstName + " " + this.person.lastName;
    }
  }

  private getCurrentPerson(): void{
    this.person = this.peopleService.currentPerson;
  }

}
