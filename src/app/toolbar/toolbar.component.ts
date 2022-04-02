import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { User } from '../sign-up/shared/user.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  currentUserSubscirption:Subscription;
  currentUser: User;
    users = [];


  constructor(private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) { 
    }


  ngOnInit(): void {
    this.currentUserSubscirption = this.authenticationService.currentUserValue.subscribe((res:User)=>{
      console.log(res);
      this.currentUser = res;
    })
    console.log(this.currentUser);
  }

  logout(){
    window.localStorage.removeItem('currentUser');
    this.router.navigate(['/login'])
    console.log(this.currentUser);
   }

   ngOnDestroy(): void {
    // this.currentUserSubscirption.unsubscribe();
  }

}
