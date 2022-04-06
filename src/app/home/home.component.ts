import { Component, OnInit } from '@angular/core';
import { User } from '../sign-up/shared/user.model';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['UserName', 'Pending Status'];
  
  
  users:User[]=[];
  
  

  constructor( private userService: UserService) {
   
        
      
    
   
   }

  ngOnInit(): void {
   
   
    // this.loadAllUsers();
    this.userService.getUsers.subscribe(
      (data:User[])=>{
      this.users=data
      console.log(this.users);
      console.log(typeof(this.users));
      
      
      
        })
    
    
  }
  
  // private loadAllUsers() {
  //   this.userService
  //     .getAll()
  //     .pipe(first())
  //     .subscribe((users) => {
  //       this.users = users;
  //       console.log(users);
  //     });
  // }

}
