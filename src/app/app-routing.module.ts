import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdateUsersComponent } from './update-users/update-users.component';


const routes: Routes = [
  
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: SignInComponent },
  { 
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    pathMatch:"full" 
  },
  { path: 'update/:id', component: UpdateUsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }