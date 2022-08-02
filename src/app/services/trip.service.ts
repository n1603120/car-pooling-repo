import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Person} from "../model/person";
import {Trip} from "../model/trip";

// INTERESTING: Useful to break out communication to a service
@Injectable()
export class TripService{
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseServerUrl + '/trips/';

  }
  getAllTrips(): Observable<Trip[]>{
    return this.http.get<Trip[]>(this.baseUrl);
  }

  getAll(): Observable<Trip[]> {
    return this.http
      .get<Trip[]>(this.baseUrl);
  }

  get(id: string): Observable<Trip> {
    return this.http.get<Trip>(this.baseUrl + id);
  }

  remove(id: string): Observable<string> {
    return this.http.delete(this.baseUrl + id, {responseType: 'text'});
  }

  addTrip(trip: Trip): Observable<string> {
    return this.http.post(this.baseUrl , trip,{
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      responseType: 'text'
    });
  }


}
