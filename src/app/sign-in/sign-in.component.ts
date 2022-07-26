import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {createRequiredRegexValidator} from "../utility/validators";
import {PeopleService} from "../services/person.service";
import {Person} from "../model/person";
import {Car} from "../model/car";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  submitted: boolean = false;
  people: Person[] = [];
  currentPerson!: Person;
  status = '';

  personObj: Person = {
    id: 1,
    firstName: "Mark",
    lastName: "Mill",
    email: "mark@gmail.com",
    phoneNumber: '07711019490' as unknown as number,
    postcode: "Bt51",
    password: "Password1!"
  }

  constructor(private formBuilder: FormBuilder, private readonly router: Router, private route: ActivatedRoute, private peopleService: PeopleService) {
    this.loginForm = formBuilder.group({
      email: ['', createRequiredRegexValidator(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)],
      password: ['', createRequiredRegexValidator(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]
    });
  };

  ngOnInit(): void {
    this.fetchAllPeople();
    // Adding person for testing
    // let personObj = new Person(
    //   1,
    //   "Mark",
    //   "Mill",
    //   "mark@gmail.com",
    //   '07711019490' as unknown as number,
    //   "Bt51",
    //   "Password1!"
    // );
    this.people.push(this.personObj);
    console.log(this.personObj);
  }

  checkUserAuth(): void{
    // @ts-ignore
    this.currentPerson = this.people.find((person: Person) => {
      return person.email === this.loginForm.value.email && person.password === this.loginForm.value.password ;
    });

    // @ts-ignore
    if (this.currentPerson) {
      console.log(this.currentPerson);
      this.router.navigate(['/home', {currentPerson: JSON.stringify(this.currentPerson)}]);
    } else {
      this.displayErrorForm();
    }
  }

  displayErrorForm(): void{
    // @ts-ignore
    document.getElementById("errorBlock").style.display = "block";
    // @ts-ignore
    document.getElementById("email").value = "";
    // @ts-ignore
    document.getElementById("password").value = "";
  }

  onSubmit() {
    this.submitted = true;
    this.checkUserAuth();
  }

  private fetchAllPeople() {
    this.peopleService
      .getAll()
      .subscribe(
        people => this.people = people,
        () => this.status = 'Unable to fetch people'
      );
  }
}
