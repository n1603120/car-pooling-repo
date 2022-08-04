import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {createRequiredRegexValidator} from "../utility/validators";
import {CarService} from "../services/car.service";
import {Person} from "../model/person";
import {Car} from "../model/car";
import {PeopleService} from "../services/person.service";



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
  allCars: Car[] = [];
  currentPerson!: Person;

  address: string = '';

  carMake = '';
  reg = '';
  noOfPassengers = 0;
  preferredContact = '';
  smokingOption = '';
  accessibility = '';
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
    console.log(this.driverForm);
    if(!this.driverForm.valid) {
      return;
    }
    this.submitDriver();
    console.log("Valid");
  }
  constructor(private formBuilder: FormBuilder, private carService: CarService, private peopleService: PeopleService ) {
    this.driverForm = formBuilder.group({
      driverCarMake: ['', Validators.required],
      driverReg: ['', createRequiredRegexValidator(/\b[a-z]{2}([1-9]|0[2-9]|6[0-9]|1[0-9])[a-z]{3}|[A-HJ-NP-Y]\d{1,3}[A-Z]{3}|[A-Z]{3}\d{1,3}[A-HJ-NP-Y]|(?:[A-Z]{1,2}\d{1,4}|[A-Z]{3}\d{1,3})|(?:\d{1,4}[A-Z]{1,2}|\d{1,3}[A-Z]{3})\b/i)],
      driverNoOfPassengers: ['1', Validators.required],
      driverPreferredContact: ['', Validators.required],
      driverSmokingOption: ['' ,Validators.required],
      driverAccessibility: ['',Validators.required],
      driverPickUp: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.fetchAllCars();
    this.getCurrentPerson();
    console.log(this.allCars);
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
  private fetchAllCars() {
    this.carService
      .getAllCars()
      .subscribe(
        cars => cars.forEach( car => this.allCars.push(car))
      )
  }

  private getCurrentPerson(): void{
    this.currentPerson = this.peopleService.currentPerson;
  }


  submitDriver() : any {
    const carMake = this.driverForm.get('driverCarMake')?.value;
    const registration = this.driverForm.get('driverReg')?.value;
    const noOfPassengers = this.driverForm.get('driverNoOfPassengers')?.value;
    const preferredOption = this.driverForm.get('driverPreferredOption')?.value;
    const smokingOption = this.driverForm.get('driverSmokingOption')?.value;
    const accessibility = this.driverForm.get('driverAccessibility')?.value;
    const pickUpAddress = this.driverForm.get('driverPickUp')?.value;

    const currentDriver = new Car(0, carMake,registration, noOfPassengers, preferredOption, smokingOption, accessibility, pickUpAddress, true)
    console.log(currentDriver);
    this.carService.addCar(currentDriver);
  }

}
