import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { User } from '../sign-up/shared/user.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  currentUserSubscription:Subscription;
  signinForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;


  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
      this.signinForm = this.fb.group({     
        email: ['', [Validators.required]],
        password:['', [Validators.required]],
      });
    }



  ngOnInit() {
    this.currentUserSubscription = this.authenticationService.currentUserValue.subscribe((res:User)=>{
      console.log(res)
      if (res && Object.keys(res).length) {
        
        this.router.navigate(['/']);
      }else{

      }
    });
  }
  get f():{ [key: string]: AbstractControl; } { return this.signinForm.controls; }
  
  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.alertService.clear();

    if (this.signinForm.invalid) {
        return;
    }

    this.loading = true;

    this.authenticationService.login(this.f.email.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      {
        next:(d)=>{
          console.log(d);
          this.router.navigate(['/']);
        },
        error:(error)=>{

          this.alertService.error(error);
          this.loading = false;
        }

      }
       );

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signinForm.value, null, 4));
  }

  ngOnDestroy(): void {
   this.currentUserSubscription.unsubscribe(); 
  }

}
