import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Person} from "../model/person";

// INTERESTING: Useful to break out communication to a service
@Injectable()
export class PeopleService{
  private readonly baseUrl: string;
  currentPerson!: Person;
  people!: Person[] ;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseServerUrl + '/people/';

  }
  getAllPeople(): Observable<Person[]>{
    return this.http.get<Person[]>(this.baseUrl);
  }




  getAll(): Observable<Person[]> {
    return this.http
      .get<Person[]>(this.baseUrl);
  }

  get(id: string): Observable<Person> {
    return this.http.get<Person>(this.baseUrl + id);
  }

  remove(id: string): Observable<string> {
    return this.http.delete(this.baseUrl + id, {responseType: 'text'});
  }

  update(person: Person): Observable<string> {
    this.currentPerson = person;
    return this.http.put(this.baseUrl + person.id, person, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      responseType: 'text'
    });
  }

  isLoggedIn(): boolean {
    return !!this.currentPerson;
  }

}