import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {createRequiredRegexValidator} from "../utility/validators";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  accountForm: FormGroup;
  submitted: boolean = false;
  private dataError: ValidationErrors | null | undefined;

  onSubmit(): void {
    this.submitted = true;
    console.log(this.accountForm);
  }

  constructor(private formBuilder: FormBuilder) {
    this.accountForm = formBuilder.group({
      fname: ['', createRequiredRegexValidator(/^[a-z ,.'-]+$/i)],
      lname: ['', createRequiredRegexValidator(/^[a-z ,.'-]+$/i)],
      email: ['', createRequiredRegexValidator(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)],
      phoneNum: ['', createRequiredRegexValidator(/^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/)],
      postcode: ['', createRequiredRegexValidator(/[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}/)],
      password: ['', createRequiredRegexValidator(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  errorPresent(accountData: string): boolean {
    this.dataError = this.accountForm.get(accountData)?.errors
    if (this.dataError) {
      // @ts-ignore
      document.getElementById(accountData).style.border = '2pt solid red';
      return true;
    } else {
      // @ts-ignore
      document.getElementById(accountData).style.border = '1pt solid black';
      return false;
    }
  }

  passwordsMatch(): boolean {
    return this.accountForm.get('password')?.value === this.accountForm.get('confirmPassword')?.value;
  }
}
