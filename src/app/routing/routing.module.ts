import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "../sign-in/sign-in.component";
import {HomeComponent} from "../home/home.component";
import {TripDetailsComponent} from "../trip-details/trip-details.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateAccountComponent} from "../create-account/create-account.component";
import {DriverDetailsComponent} from "../driver-details/driver-details.component";
import {DriverSummaryComponent} from "../driver-summary/driver-summary.component";
import {MyBookingsComponent} from "../my-bookings/my-bookings.component";
import {PassengerResultsComponent} from "../passenger-results/passenger-results.component";
import {PassengerSummaryComponent} from "../passenger-summary/passenger-summary.component";
import {ConfirmationPageComponent} from "../confirmation-page/confirmation-page.component";
import {EditAccountComponent} from "../edit-account/edit-account.component";
import {ViewCarsComponent} from "../view-cars/view-cars.component";

export const routes: Routes = [
  {path: 'login', component: SignInComponent},
  {path: 'home', component: HomeComponent},
  {path: 'edit-account', component: EditAccountComponent},
  {path: 'view-cars', component: ViewCarsComponent},
  {path: 'create-account', component: CreateAccountComponent},
  {path: 'register-driver', component: DriverDetailsComponent},
  {path: 'driver-summary', component: DriverSummaryComponent},
  {path: 'bookings', component: MyBookingsComponent},
  {path: 'confirmation', component: ConfirmationPageComponent},
  {path: 'passenger-results', component: PassengerResultsComponent},
  {path: 'passenger-summary', component: PassengerSummaryComponent},
  {path: 'find-trip', component: TripDetailsComponent},
  {path: '**', redirectTo: 'login'}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoutingModule {
}

