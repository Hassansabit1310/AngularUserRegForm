import { Component, OnInit } from '@angular/core';
import { User } from '../sign-up/shared/user.model';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['UserName','Edit' ,'Pending Status'];
  
  
  users:User[]=[];
  currenUsers:User;
  
  

  constructor( private userService: UserService,
    private router: Router) {
   
        
      
    
   
   }

  ngOnInit(): void {
   
   
    // this.loadAllUsers();
    this.userService.getUsers.subscribe(
      (data:User[])=>{
      this.users=data
      console.log(this.users);
      console.log(typeof(this.users));
      this.users.map((p)=>{
      console.log(p.id);
     
      
      })
      
      
      
        })

        this.userService.getCurrentUsers.subscribe(
          (data:User)=>{
            this.currenUsers=data
            console.log(data);
            
          }
        )
    
    
  }
  
  updateUsers(){
    this.userService.getUsers.subscribe(
      (data:User[])=>{
      this.users=data
      console.log(this.users);
      console.log(typeof(this.users));
      this.users.map((p)=>{
      console.log(p.id);

      console.log("ok");
      
     
      
      })
      
      
      
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
