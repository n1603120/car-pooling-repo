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

import {PassengerSummaryComponent} from "./passenger-summary/passenger-summary.component";
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';

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
    PassengerSummaryComponent,
    ConfirmationPageComponent


  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
