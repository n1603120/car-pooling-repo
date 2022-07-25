import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Person} from "../model/person";

// INTERESTING: Useful to break out communication to a service
@Injectable()
export class PeopleService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseServerUrl + '/people/';
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
    return this.http.put(this.baseUrl + person.id, person, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      responseType: 'text'
    });
  }
}
