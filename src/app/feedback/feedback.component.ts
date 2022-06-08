import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rating, RatingRequest, User } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { ToastrService } from 'ngx-toastr';
import { DefaultTableService } from '@app/_services';

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
    private defaultTableService: DefaultTableService
  ) {
    this.loginForm = this.formBuilder.group({
      description: ['', Validators.required],
      ratingValue: ['', Validators.required],
    });
  }

  public addEmoji(event: any) {
    this.f.ratingValue.setValue(`${this.f.ratingValue.value}${event.emoji.native}`);
    this.isEmojiPickerVisible = false;
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.loginForm?.invalid) {
        this.toastr.error('A mezők nem lehetnek üresek!', "Hoppá");
        return;
    }
    
    let rating: Rating = {
        description: this.f.description.value,
        ratingValue: this.f.ratingValue.value,
        creationDate: (new Date()).toJSON()
    }
    let ratingRequest: RatingRequest = {
      userOwnerEmail: this.authenticationService.currentUserValue?.email,
      tableId: this.defaultTableService.table.value?.id,
      rating: rating
    }

    this.ratingService.addRating(ratingRequest).subscribe({
      next: (respons) => {
          // get return url from route parameters or default to '/'
          //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          //this.router.navigate([returnUrl]);
          
          this.toastr.show("You added a notice!");
          this.defaultTableService.getDefaultTableId();
      },
      error: error => {
          //this.error = error;
          //this.loading = false;
          
          switch(error){
            case "Table is not found!" :
              this.toastr.error("Choose a board!");
              break;
            case "Internal server error":
              this.toastr.error("Hooops, some error");
              break;
          }
      }
  });


}

  ngOnInit(): void {
  }

}
