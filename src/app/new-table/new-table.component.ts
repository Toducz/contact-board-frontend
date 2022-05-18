import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, TableService } from '@app/_services';

import { ToastrService } from 'ngx-toastr';
import { CreateTable } from '@app/_models';



@Component({
  selector: 'app-new-table',
  templateUrl: './new-table.component.html',
  styleUrls: ['./new-table.component.scss']
})
export class NewTableComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tableService: TableService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,

  ) {

    this.loginForm = this.formBuilder.group({
      tableName: ['', Validators.required],
      invitedPersonEmail: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  // convenience getter for easy access to form fields
  get f(): any { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    if (!this.authenticationService.currentUser) {
      return;
    }

    let createTable: CreateTable =
    {
      UserEmailOwner: this.authenticationService.currentUserValue?.email,
      tableName: this.f.tableName.value,
      invitedPersonEmail: this.f.invitedPersonEmail.value,
      description: this.f.description.value
    };

    console.log(createTable);

    this.loading = true;
    this.tableService.createTable(createTable)
      .subscribe({
        next: (next) => {
          // get return url from route parameters or default to '/'
          console.log(next);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  btnClickSignUp() {
    this.router.navigate(['/home']);
  }
}
