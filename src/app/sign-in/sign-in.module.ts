import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./sign-in.component";

export const routes: Routes = [
  {path: 'signIn', component: SignInComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export default class HomeModule {
}
