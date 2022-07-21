import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {createRequiredRegexValidator} from "../utility/validators";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  detailsForm: FormGroup;
  private userEmail = 'email@email.com';
  private userPassword = 'Password1!';
  newEmail = '';
  newPassword = '';
  errorMessage = ''

  constructor(private formBuilder: FormBuilder, private readonly router: Router) {
    this.detailsForm = formBuilder.group({
      email: ['', createRequiredRegexValidator(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      password: ['', createRequiredRegexValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]
    });
  };

  ngOnInit(): void {
  }

  checkUserAuth(): void {
    if (this.newEmail === this.userEmail && this.newPassword === this.userPassword) {
      this.router.navigate(['/home-page']);
    } else {
      this.showText()
    }
  }

  showText() {
    this.errorMessage = 'It looks like there\'s an error in your email address or password. Please try again';
    return this.errorMessage;
  }
}
