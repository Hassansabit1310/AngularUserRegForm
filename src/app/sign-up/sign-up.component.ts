import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators} from '@angular/forms';
import { MustMatch } from './helpers/must-match.validator';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  myForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      firstname:['', Validators.required],
      secondname:['', Validators.required],
      dob: ['', Validators.required],
      email: ['', {
        validators: [Validators.required, Validators.email],
        updateOn: "blur"
      }
        ],
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

    // stop here if form is invalid
    if (this.myForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.myForm.value, null, 4));
  }

}
