import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: 'signup', component: UserFormComponent },
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'generateotp', component: OtpComponent },
  { path: 'login/:userId', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
