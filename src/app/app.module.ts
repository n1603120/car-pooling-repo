import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {RoutingModule} from './routing/routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TripDetailsComponent} from "./trip-details/trip-details.component";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import {PassengerResultsComponent} from "./passenger-results/passenger-results.component";
import {DriverDetailsComponent} from "./driver-details/driver-details.component";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {SummaryComponent} from "./summary/summary.component";
import {ConfirmationPageComponent} from "./confirmation-page/confirmation-page.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {MyBookingsComponent} from "./my-bookings/my-bookings.component";
import {EditAccountComponent} from "./edit-account/edit-account.component";
import { ViewCarsComponent } from './view-cars/view-cars.component';
import {PeopleService} from "./services/person.service";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./home/home.component";
import {CarService} from "./services/car.service";
import {TripService} from "./services/trip.service";
import {NgSelectModule} from "@ng-select/ng-select";



@NgModule({
  declarations: [
    AppComponent,
    TripDetailsComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    PassengerResultsComponent,
    DriverDetailsComponent,
    CreateAccountComponent,
    SummaryComponent,
    ConfirmationPageComponent,
    SignInComponent,
    MyBookingsComponent,
    EditAccountComponent,
    ViewCarsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [
    PeopleService,
    CarService,
    TripService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
