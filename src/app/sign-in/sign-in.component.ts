import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {createRequiredRegexValidator} from "../utility/validators";
import {PeopleService} from "../services/person.service";
import {Person} from "../model/person";
import {Car} from "../model/car";
import { interval } from 'rxjs';

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

  constructor(private formBuilder: FormBuilder, private readonly router: Router, private peopleService: PeopleService) {
    this.loginForm = formBuilder.group({
      email: ['', createRequiredRegexValidator(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)],
      password: ['', createRequiredRegexValidator(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]
    });
  };

  ngOnInit(): void {
    this.fetchAllPeople();
    console.log(this.people);
  }

  checkUserAuth(): void{
    //TESTING
    this.loginForm.value.password = "Password1!"
    // @ts-ignore
    this.currentPerson = this.people.find((person: Person) => {
      return person.email === this.loginForm.value.email && person.personPassword === this.loginForm.value.password ;
    });
    // @ts-ignore
    if (this.currentPerson) {
      console.log(this.currentPerson);
      this.peopleService.currentPerson = this.currentPerson;
      this.router.navigate(['/home']);
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

  private async fetchAllPeople() {
    await this.delay(1000);
    this.peopleService
      .getAllPeople()
      .subscribe(
        people => people.forEach(p => this.people.push(p) && console.log(p))
      )
  }
  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


}
