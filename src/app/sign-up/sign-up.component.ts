import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from '../helpers/must-match.validator';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from './shared/user.model';
import { sub } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  myForm: FormGroup;
  submitted = false;
  loading=false;
  returnUrl:string;
  currentUser:User;
  validAge:number = 18;
  currentDate:Date = new Date();
  maxValidDOB:Date = sub(this.currentDate, {years:this.validAge});
  nameFieldActive:boolean = false;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService:UserService
    ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUser;
    this.myForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      dob: ['', Validators.required],
      phone: ["", 
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern("^(01)[0-9]{9}$")
        ] 
      ],
      email: ['', {
        validators: [Validators.required,Validators.email],
        updateOn: 'change'
      }],
      password:['', [
        Validators.required, 
        Validators.minLength(6)
      ]],
      confirmPassword:['', Validators.required]
    },
    {
      validators: [ MustMatch('confirmPassword', 'password')]
    });
  }
  get firstName() {
    return this.myForm.get("firstName"); 
  }
  get lastName() {
    return this.myForm.get("lastName"); 
  }
  get dob() {
    return this.myForm.get("dob"); 
  }
  get email() {
    return this.myForm.get("email"); 
  }
  get phone() {
    return this.myForm.get("phone"); 
  }
  get password() {
    return this.myForm.get("password"); 
  }
  get confirmPassword() {
    return this.myForm.get("confirmPassword"); 
  }

  get user():User{
    let user:User =null;
    user={
      id:uuidv4(),
      firstName: this.firstName.value.trim(),
      lastName: this.lastName.value.trim(),
      email: this.email.value.trim().toLowerCase(),
      phone: this.phone.value.trim(),
      dob: this.dob.value,
      password: this.password.value,
      status:'pending',
      role:''
    }
    return user;
  }

  enableNameFieldError(){
    this.nameFieldActive = true;
  }
  
  onSubmit():void {
    this.submitted = true;
    console.log("ok");
    

    if (this.myForm.valid) {
      this.userService.registerUser(this.user).then((res:"success")=>{
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/login'])
      }).catch((err)=>{
        const errorMessage:string = "User already exists!" 
        this.alertService.error(errorMessage);
      })
    }
  }

}
