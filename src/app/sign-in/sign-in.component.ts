import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signinForm: FormGroup;
  submitted = false;
  loading = false;
    returnUrl: string;

  constructor( private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) 
    {
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }
    }


  ngOnInit() {
    this.signinForm = this.fb.group({
      
      email: ['', [Validators.required]],
      password:['', [Validators.required]],
     



    });
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
          this.router.navigate([this.returnUrl]);

        },
        error:(error)=>{

          this.alertService.error(error);
          this.loading = false;
        }

      }
       );

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signinForm.value, null, 4));
  }

}
