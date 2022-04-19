import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../sign-up/shared/user.model';

@Component({ templateUrl: 'update-users.component.html' })

export class UpdateUsersComponent implements OnInit {
   users = JSON.parse(localStorage.getItem('users')) || [];
    myForm: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    selectedUser:User=null
    status=[{
      viewValue:"Pending",
      value:"pending"
    },
    {
      viewValue:"Approved",
      value:"approved"
    },
    {
      viewValue:"Disable",
      value:"disable"
    }
  ]
  roles=[
    {
      viewValue:"Admin",
      value:"admin"
    },
    {
      viewValue:"User",
      value:"user"
    }
    
  ]

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private authService:AuthenticationService
        
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
      //  console.log(this.id);
       
     this.selectedUser=this.users.find((user:User)=>{
        return user.id===this.id

      })
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.myForm = this.formBuilder.group({
            firstName: [this.selectedUser.firstName??"not found", Validators.required],
            lastName: [this.selectedUser.lastName??"not found", Validators.required],
            email: [this.selectedUser.email??"not found", Validators.required],
            status: [this.selectedUser.status?this.selectedUser.status:"pending", Validators.required],
            roles: [this.selectedUser.roles?this.selectedUser.roles:"user", Validators.required],


        });

        // if (!this.isAddMode) {
        //     this.userService.getById(this.id)
        //         .pipe(first())
        //         .subscribe(x => {
        //             this.f.firstName.setValue(x.firstName);
        //             this.f.lastName.setValue(x.lastName);
                    
        //         });
        // }
    }

    // convenience getter for easy access to form fields
    get f() { return this.myForm.controls; }

    onSubmit() {
        this.submitted = true;

        console.log(this.myForm.value);
        console.log(this.id);
        

        // this.authService.update(this.id, this.myForm.value)
        // .pipe(first())
        // .subscribe(
        //     data => {
        //         console.log(data);
                
        //         this.router.navigate(['..', { relativeTo: this.route }]);
        //     });

this.updateUser()
           
  

        // // reset alerts on submit
        // this.alertService.clear();

        // // stop here if form is invalid
        // if (this.myForm.invalid) {
        //     return;
        // }

      // console.log("updated");
      
      //       this.updateUser();
    
    }


    

    updateUser() {
      // if (!isLoggedIn()) return unauthorized();

      let urlId=parseInt(this.route.snapshot.params['id'])
      console.log(this.users);
      
      console.log(typeof(this.id));
      
      

      let params = this.myForm.value;
      let user = this.users.find(x => x.id===this.route.snapshot.params['id']);
      console.log(params,"params");
      console.log(user,"users")
      

     
      

      // only update password if entered
      // if (!params.password) {
      //     delete params.password;
      // }

      // update and save user
      Object.assign(user, params);
      localStorage.setItem('users', JSON.stringify(this.users));

      
  }
}
