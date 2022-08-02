import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {createRequiredRegexValidator} from "../utility/validators";
import {Router} from "@angular/router";
import {Person} from "../model/person";
import {PeopleService} from "../services/person.service";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  editForm: FormGroup;
  submitted: boolean = false;
  private dataError: ValidationErrors | null | undefined;
  person!: Person;

  constructor(private formBuilder: FormBuilder, private readonly router: Router, private peopleService: PeopleService) {
    this.editForm = formBuilder.group({
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
    // get current person logged in
    this.person = this.peopleService.currentPerson;
    this.updateFromModel(this.person);
  }
  private updateToModel(): void {
    const modelData = this.editForm.value;
    this.person.firstName = modelData.firstName;
    this.person.lastName = modelData.lname;
    this.person.email = modelData.email;
    this.person.phoneNumber = modelData.phoneNum;
    this.person.postcode = modelData.postcode;
    this.person.personPassword = modelData.password;
    this.peopleService.update(this.person);
  }

  private updateFromModel(person: Person): void {
    this.editForm.setValue({
      fname: person.firstName,
      lname: person.lastName,
      email: person.email,
      phoneNum: person.phoneNumber,
      postcode: person.postcode,
      password: "",
      confirmPassword: ""
    });
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.editForm);
    if(this.editForm.valid){
      this.updateToModel();
      this.router.navigate(['/home']);
    }
  }

  errorPresent(accountData: string): boolean {
    this.dataError = this.editForm.get(accountData)?.errors
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
    return this.editForm.get('password')?.value === this.editForm.get('confirmPassword')?.value;
  }
}
