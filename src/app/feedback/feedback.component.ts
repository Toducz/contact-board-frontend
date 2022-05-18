import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rating, User } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';

import { RatingService } from '@app/_services';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  loginForm: FormGroup;
  isEmojiPickerVisible?: boolean;
  currentUser: User | null = this.authenticationService.currentUserValue

  get f(): any { return this.loginForm?.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private ratingService: RatingService,
  ) {
    this.loginForm = this.formBuilder.group({
      description: ['', Validators.required],
      ratingValue: ['', Validators.required],
    });
  }

  public addEmoji(event: any) {
    console.log("Yes");
    this.f.ratingValue.setValue(`${this.f.ratingValue.value}${event.emoji.native}`);
    this.isEmojiPickerVisible = false;
    console.log(this.f.ratingValue.value);
    
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.loginForm?.invalid) {
        this.toastr.error('A mezők nem lehetnek üresek!', "Hoppá");
        return;
    }
    
    let rating: Rating = {
        userEmail: this.currentUser?.email,
        description: this.f.description.value,
        ratingValue: this.f.ratingValue.value,
        creationDate: (new Date()).toJSON()
    }
    console.log(rating);

    this.ratingService.addRating(rating).subscribe({
      next: (respons) => {
          // get return url from route parameters or default to '/'
          //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          //this.router.navigate([returnUrl]);
          console.log(respons);
      },
      error: error => {
          //this.error = error;
          //this.loading = false;
          console.log("Errror");
      }
  });

    

    /*
    this.registrationService.registration(registrationUser)
      .pipe(first())
      .subscribe(
          next => {
              console.log(next);
              this.loading = false;
              this.toastr.success('"Succesfule", Registration');
          },
          error => {
              console.log(error);
              this.toastr.success(error, 'Registration');
              this.loading = false;
          }
      );*/
}

  ngOnInit(): void {
  }

}
