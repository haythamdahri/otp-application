import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OtpFormComponent } from './otp-form/otp-form.component';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AuthenticatedGuard } from './services/auth/authenticated-guard.service';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path : 'signin', component: SigninComponent, canActivate: [AuthenticatedGuard]
  },
  {
    path: 'otp/save', component: OtpFormComponent, canActivate: [AuthGuard]
  },
  {
    path: 'otp/save/:id', component: OtpFormComponent, canActivate: [AuthGuard]
  },
  {
    path : '**', redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
