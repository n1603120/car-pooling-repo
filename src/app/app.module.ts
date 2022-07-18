import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { PassengerResultsComponent } from './passenger-results/passenger-results.component';
import { DriverSummaryComponent } from './driver-summary/driver-summary.component';
import { PassengerSummaryComponent } from './passenger-summary/passenger-summary.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    CreateAccountComponent,
    HomeComponent,
    TripDetailsComponent,
    DriverDetailsComponent,
    PassengerResultsComponent,
    DriverSummaryComponent,
    PassengerSummaryComponent,
    MyBookingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
