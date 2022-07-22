import {Person} from "./person";

export interface Car {
  ownerId: number;
  make: string;
  registration: string;
  numOfSeats: string;
  preferredContact: string;
  smokingOption: boolean;
  accessibility: string;
  preferredPickUp: string;
  getDriver(): Person;

  // might need
  // password: string;
}

function getDriver():Person {
  // find person from the owner id
  const person: Person = {
    id: 1,
    firstName: "Mark",
    lastName: "Mill",
    email: "mark@gmail.com",
    phoneNumber: '07711019490' as unknown as number,
    postcode: "Bt51"
  }
  return person;
}
