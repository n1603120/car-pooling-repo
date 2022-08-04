import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Person} from "../model/person";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Car} from "../model/car";
import {Trip} from "../model/trip";

// INTERESTING: Useful to break out communication to a service
@Injectable()
export class CarService{
  private readonly baseUrl: string;
  currentCar!: Car;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseServerUrl + '/cars/';

  }
  getAllCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.baseUrl);
  }

  getCarsByOwnerId(id: number): Observable<Car[]>{
    return this.http.get<Car[]>(this.baseUrl + 'byOwnerId/' + id);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(this.baseUrl + 'byCarId/'+ id);
  }
  getActiveCar(ownerId: number): Observable<Car> {
    return this.http.get<Car>(this.baseUrl + 'byOwnerId/ActiveCar/'+ ownerId);
  }

  update(car: Car): Observable<string> {
    console.log("UPDATE");
    console.log(car);
    return this.http.put(this.baseUrl + car.id, car, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      responseType: 'text'
    });
  }
  remove(id: number): Observable<string> {
    return this.http.delete(this.baseUrl + id, {responseType: 'text'});
  }

  addCar(car: Car): Observable<string> {
    return this.http.post(this.baseUrl , car,{
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      responseType: 'text'
    });
  }
}
