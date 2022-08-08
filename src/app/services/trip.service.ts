import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Person} from "../model/person";
import {Trip} from "../model/trip";
import {Car} from "../model/car";

@Injectable()
export class TripService{
  private readonly baseUrl: string;
  currentTrip!: Trip;
  driverTripSelected!: Trip;

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseServerUrl + '/trips/';

  }
  getAllTrips(): Observable<Trip[]>{
    return this.http.get<Trip[]>(this.baseUrl);
  }

  getTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(this.baseUrl + 'byId/'+ id);
  }

  remove(id: number): Observable<string> {
    return this.http.delete(this.baseUrl + id, {responseType: 'text'});
  }

  addTrip(trip: Trip): Observable<any> {
    return this.http.post(this.baseUrl, JSON.stringify(trip),{'headers':this.headers})
  }

  getTripsByOwnerId(id: number): Observable<Trip[]>{
    return this.http.get<Trip[]>(this.baseUrl + 'byPersonId/' + id);
  }
}
