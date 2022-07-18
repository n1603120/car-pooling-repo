import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "../sign-in/sign-in.component";
import {HomeComponent} from "../home/home.component";

export const routes: Routes = [
  {path: 'signIn', component: SignInComponent},
  {path: '', component: HomeComponent},
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
