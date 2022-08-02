// export class Person {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: number;
//   postcode: string;
//   password: string;
//
//   constructor(Id: number, FirstName: string, LastName: string, Email: string,  PhoneNumber: number, Postcode: string, Password: string ) {
//     this.id = Id;
//     this.firstName = FirstName;
//     this.lastName = LastName;
//     this.email = Email;
//     this.phoneNumber = PhoneNumber;
//     this.postcode = Postcode;
//     this.password = Password;
//   }
// }
export interface Person{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  postcode: string;
  personPassword: string;
}
