import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TripDetailsComponent} from "./trip-details.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

export const routes: Routes = [
  {path: '', component: TripDetailsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    TripDetailsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export default class TripDetailsModule{
}
