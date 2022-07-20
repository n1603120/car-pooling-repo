import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  title = 'ReactiveForms';
  tripForm: FormGroup;
  submitted = false;

  onSubmit(): void {
    this.submitted = true;
    if(!this.tripForm.valid) {
      return;
    }
    console.log(this.tripForm);
  }
  constructor(private formBuilder: FormBuilder) {
    this.tripForm = formBuilder.group({
      tripPostcode: ['', Validators.required],
      tripDestination: ['', Validators.required],
      tripDate: ['', Validators.required],
      tripTime: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }

}
