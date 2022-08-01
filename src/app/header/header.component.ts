import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PeopleService} from "../services/person.service";
import {Person} from "../model/person";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentPerson!: Person;

  constructor(private readonly router: Router, private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.peopleService.currentPerson = this.currentPerson;
  }

  isLoggedIn(): boolean {
    return this.peopleService.isLoggedIn();
  }
}
