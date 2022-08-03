import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {createRequiredRegexValidator} from "../utility/validators";
import {Router} from "@angular/router";
import {Car} from "../model/car";
import {Person} from "../model/person";
import {PeopleService} from "../services/person.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  accountForm: FormGroup;
  submitted: boolean = false;
  private dataError: ValidationErrors | null | undefined;

  constructor(private formBuilder: FormBuilder, private peopleService: PeopleService,private readonly router: Router) {
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

  onSubmit(): void {
    this.submitted = true;
    console.log(this.accountForm);
    if(this.accountForm.valid){
      this.router.navigate(['/login']);
    }
  }

  errorPresent(accountData: string): boolean {
    this.dataError = this.accountForm.get(accountData)?.errors
    if(this.dataError){
      // @ts-ignore
      document.getElementById(accountData).style.border = '2pt solid red';
      return true;
    }
    else{
      // @ts-ignore
      document.getElementById(accountData).style.border = '1pt solid black';
      return false;
    }
  }
  passwordsMatch(): boolean {
    return this.accountForm.get('password')?.value === this.accountForm.get('confirmPassword')?.value;
  }

  submitAccount() : any {
    let firstName: string = "";
    let lastName = "";
    let email = "";
    let phoneNo = "";
    let postcode = "";
    let password = "";

    const input = document.getElementById('fname') as HTMLInputElement | null;
    if(input?.value){
      firstName = input.value;
    }

    const input1 = document.getElementById('lname') as HTMLInputElement | null;
    if(input1?.value){
      lastName = input1.value;
    }

    const input2 = document.getElementById('email') as HTMLInputElement | null;
    if(input2?.value){
      email = input2.value;
    }

    const input3 = document.getElementById('phoneNum') as HTMLInputElement | null;
    if(input3?.value) {
      phoneNo = input3.value;
    }

    const input4 = document.getElementById('postcode') as HTMLInputElement | null;
    if(input4?.value) {
      postcode = input4.value;
    }

    const input5 = document.getElementById('password') as HTMLInputElement | null;
    if(input5?.value) {
      password = input5.value;
    }

    const account = new Person(0, firstName, lastName, email, phoneNo, postcode, password);
    console.log(account);
    this.peopleService.addPerson(account);
  }

}
