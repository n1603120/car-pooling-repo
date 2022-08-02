import {Person} from "./person";

export class Car {
  ownerId: number;
  make: string;
  registration: string;
  numOfSeats: string;
  preferredContact: string;
  smokingOption: string;
  accessibility: string;
  preferredPickUp: string;
  activeCar: boolean;

  constructor(OwnerId: number, Make: string, Registration: string,  NumOfSeats: string, PreferredContact: string, SmokingOption: string, Accessibility: string, PreferredPickUp: string, ActiveCar: boolean ) {
    this.ownerId = OwnerId;
    this.make = Make;
    this.registration = Registration;
    this.numOfSeats = NumOfSeats;
    this.preferredContact = PreferredContact;
    this.smokingOption = SmokingOption;
    this.accessibility = Accessibility;
    this.preferredPickUp = PreferredPickUp;
    this.activeCar = ActiveCar;
  }


  getDriver():Person {
    // find person from the owner id
    const person: Person = {
      id: 1,
      firstName: "Mark",
      lastName: "Mill",
      email: "mark@gmail.com",
      phoneNumber: '07711019490' as unknown as number,
      postcode: "Bt51",
      password: "Password1!"
    }
    return person;
  }
}
