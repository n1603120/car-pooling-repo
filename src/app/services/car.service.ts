import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Person} from "../model/person";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Car} from "../model/car";

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

  get(id: string): Observable<Car> {
    return this.http.get<Car>(this.baseUrl + id);
  }

  remove(id: string): Observable<string> {
    return this.http.delete(this.baseUrl + id, {responseType: 'text'});
  }


}
