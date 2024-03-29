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
  private people: Person[] = [];
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
    this.fetchAllPeople();
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.accountForm);
    if(this.accountForm.valid){
      this.submitAccount();
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

  isEmailTaken(): boolean{
    if(this.submitted || this.accountForm.get('email')?.touched){
      const personFound = this.people.find((p: Person) => p.email === this.accountForm.get('email')?.value);
      if(personFound === undefined){
        // @ts-ignore
        document.getElementById('email').style.border = '1pt solid black';
        return false;
      }else {
        // @ts-ignore
        document.getElementById('email').style.border = '2pt solid red';
        return true;
      }
    }
    return false;
  }

  submitAccount(){
    const firstName = this.accountForm.get('fname')?.value;
    const lastName = this.accountForm.get('lname')?.value;
    const email = this.accountForm.get('email')?.value;
    const phoneNo = this.accountForm.get('phoneNum')?.value;
    const postcode = this.accountForm.get('postcode')?.value;
    const password = this.accountForm.get('password')?.value;

    const account = new Person(firstName, lastName, email, phoneNo, postcode, password);
    console.log(account);
    this.peopleService.addPerson(account).subscribe((data) => {});
  }
  private async fetchAllPeople() {
    await this.delay(1000);
    this.peopleService
      .getAllPeople()
      .subscribe(
        people => people.forEach(p => this.people.push(p))
      )
  }
  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
