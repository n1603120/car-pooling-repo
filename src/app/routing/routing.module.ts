import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "../sign-in/sign-in.component";
import {HomeComponent} from "../home/home.component";
import {CreateAccountComponent} from "../create-account/create-account.component";
import {DriverDetailsComponent} from "../driver-details/driver-details.component";
import {DriverSummaryComponent} from "../driver-summary/driver-summary.component";
import {MyBookingsComponent} from "../my-bookings/my-bookings.component";
import {PassengerResultsComponent} from "../passenger-results/passenger-results.component";
import {PassengerSummaryComponent} from "../passenger-summary/passenger-summary.component";
export const routes: Routes = [
  {path: 'signIn', component: SignInComponent},
  {path: 'home', component: HomeComponent},
  {path: 'account', component: CreateAccountComponent},
  {path: 'driver', component: DriverDetailsComponent},
  {path: 'dSummary', component: DriverSummaryComponent},
  {path: 'bookings', component: MyBookingsComponent},
  {path: 'pResults', component: PassengerResultsComponent},
  {path: 'pSummary', component: PassengerSummaryComponent},
  {path: '**', redirectTo: ''}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {
}
export const routingComponents = [SignInComponent, HomeComponent]
