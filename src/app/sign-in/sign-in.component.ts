import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {createRequiredRegexValidator} from "../utility/validators";
import {PeopleService} from "../services/person.service";
import {Person} from "../model/person";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  private userEmail = 'email@email.com';
  private userPassword = 'Password1!';
  errorMessage = ''
  submitted: boolean = false;
  private dataError: ValidationErrors | null | undefined;

  people: Person[] = [];
  status = '';

  constructor(private formBuilder: FormBuilder, private readonly router: Router, private peopleService: PeopleService) {
    this.loginForm = formBuilder.group({
      email: ['', createRequiredRegexValidator(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)],
      password: ['', createRequiredRegexValidator(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]
    });
  };

  ngOnInit(): void {
    this.fetchAllPeople();
  }

  checkUserAuth(): boolean {
    // @ts-ignore
    if (this.loginForm.value.email === this.userEmail && this.loginForm.value.password  === this.userPassword) {
      this.router.navigate(['/home']);
      return true;
    } else {
      // @ts-ignore
      document.getElementById("errorBlock").style.display = "block";
      return false;
    }
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
