import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
import { RegistrationService } from '@app/_services';
import { RegistrationUser } from '@app/_models';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private registrationService: RegistrationService,
      private toastr: ToastrService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }

      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.loginForm?.controls; }

onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm?.invalid) {
        return;
    }
    
    let registrationUser = {
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value,
        email: this.f.email.value,
        password: this.f.password.value
    }

    this.loading = true;

    this.registrationService.registration(registrationUser)
        .pipe(first())
        .subscribe(
            next => {
                this.loading = false;
                this.toastr.success("Succesfule", 'Registration');
            },
            error => {
                this.toastr.error(error, 'Registration failed');
                this.loading = false;
            }
        );
}

  btnClickBack(){

      this.router.navigate(['/login']);
  }
}
