import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";


@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {
  title = 'ReactiveForms';
  driverForm: FormGroup;
  submitted = false;
  private dataError: ValidationErrors | null | undefined;

  carMake = '';
  reg = '';
  noOfPassengers = 0;
  preferredContact = '';
  smokingOption = false;
  accessibility = false;
  preferredPickUp = '';


  isEmail: boolean = false;
  isPhone: boolean = false;

  rows: any[] = [{
    checked:false,
    key:'',
    value:''
  }];


  onSubmit(): void {
    this.submitted = true;
    if(!this.driverForm.valid) {
      return;
    }
    console.log(this.driverForm);
  }
  constructor(private formBuilder: FormBuilder) {
    this.driverForm = formBuilder.group({
      driverCarMake: [''],
      driverReg: ['', Validators.required],
      driverNoOfPassengers: ['1', Validators.required],
      driverPreferredContact: ['', Validators.required],
      driverSmokingOption: [''],
      driverAccessibility: [''],
      driverPickUp: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }

  isEmailCheck(): void{
    this.isEmail =! this.isEmail;
  }

  isPhoneCheck(): void{
    this.isPhone =! this.isPhone;
  }

  errorPresent(driverData: string): boolean {
    this.dataError = this.driverForm.get(driverData)?.errors
    if(this.dataError){
      // @ts-ignore
      document.getElementById(driverData).style.border = '2pt solid red';
      return true;
    }
    else{
      // @ts-ignore
      document.getElementById(driverData).style.border = '1pt solid black';
      return false;
    }
  }


  checkAndAddRow(i:number){
    this.rows[i].checked = true;
    if(this.rows.length - 1 == i){
      this.rows.push({
        checked:false,
        key:'',
        value:''
      })
    }

  }
}
