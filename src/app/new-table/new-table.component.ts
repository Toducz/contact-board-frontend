import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, TableService } from '@app/_services';

import { ToastrService } from 'ngx-toastr';
import { CreateTable } from '@app/_models';



interface Response {
  status: string;
  message: string;
}




@Component({
  selector: 'app-new-table',
  templateUrl: './new-table.component.html',
  styleUrls: ['./new-table.component.scss']
})
export class NewTableComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error?: Response;

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
      invitedPersonEmail: ['', Validators.required],
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

    let tSharedEmail: string[] = []
    
    let sharedEmails: any[] = this.f.invitedPersonEmail.value.split(",")
    sharedEmails.forEach(x => {
      tSharedEmail.push(x.trim());
    })

    let createTable: CreateTable =
    {
      UserOwnerEmail: this.authenticationService.currentUserValue?.email,
      tableName: this.f.tableName.value,
      sharedWithEmails: tSharedEmail,
      description: this.f.description.value,
      createDate: (new Date()).toISOString()
    };

    console.log(createTable);

    this.loading = true;
    this.tableService.createTable(createTable)
      .subscribe({
        next: (next) => {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: (error: Response) => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  btnClickSignUp() {
    this.router.navigate(['/home']);
  }
}
