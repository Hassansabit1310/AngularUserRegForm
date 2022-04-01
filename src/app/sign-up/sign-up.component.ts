import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from '../helpers/must-match.validator';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs';
import { UserService } from '../services/user.service';
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

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService:UserService
    ) {
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }
    }

  ngOnInit() {
    this.myForm = this.fb.group({
      firstname:this.fb.control('', {validators:[Validators.required],updateOn: 'change'}),
      secondname:['', Validators.required],
      dob: ['', Validators.required],
      email: ['', {
<<<<<<< HEAD
        validators: [Validators.required, Validators.email],
        updateOn: "blur"
      }
        ],
=======
        validators: [Validators.required,Validators.email],
        updateOn: 'change'
      }],
>>>>>>> f39eede9c531c709f4fe916274abbf2ce5d5ee74
      password:['', [Validators.required, Validators.minLength(6)]],
      confirm:['', Validators.required]



    },
    {
      validator: MustMatch('password', 'confirm')
  });
  }
  get f():{ [key: string]: AbstractControl; } { return this.myForm.controls; }
  
  onSubmit(form: FormGroup) {
    this.submitted = true;

    if (this.myForm.invalid) {
        return;
    }

    this.loading = true;
        this.userService.register(this.myForm.value)
            .pipe(first())
            .subscribe(
              {
                next: (data)=>{
                  this.alertService.success('Registration successful', true);
                
                  console.log(data)
                },
                error:(e)=>{
                  this.alertService.error(e);
                    this.loading = false;
                }
              }
              
              );

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.myForm.value, null, 4));
  }

}
