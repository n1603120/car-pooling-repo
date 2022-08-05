import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../model/person";
import {ActivatedRoute, Router} from "@angular/router";
import {PeopleService} from "../services/person.service";
import {CarService} from "../services/car.service";
import {Car} from "../model/car";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  person!: Person;
  currentlyActiveCar!: Car;

  constructor(private readonly router: Router, private peopleService: PeopleService, private carService: CarService) {
  }

  ngOnInit(): void {
    this.getCurrentPerson();
    this.fetchActiveCar();
    this.populateNameHeader();
  }
  private populateNameHeader(): void{
    if(this.person){
      // @ts-ignore
      document.getElementById("nameBanner").innerText = "Welcome " + this.person.firstName + " " + this.person.lastName;
    }
  }

  private getCurrentPerson(): void{
    this.person = this.peopleService.currentPerson;
  }

  setDriverStatus(option: string) {
    this.peopleService.driverStatus = option === "Driver";
    if(this.currentlyActiveCar){
      this.router.navigate(['trip-details']);
    }
    else{
      this.router.navigate(['register-driver']);
    }

  }
  private fetchActiveCar(){
    this.carService.getActiveCar(this.peopleService.currentPerson.id)
      .subscribe(car => this.currentlyActiveCar = car);
  }
}
