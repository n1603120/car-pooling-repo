import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./sign-in.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export const routes: Routes = [
  {path: '', component: SignInComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export default class HomeModule {
}
