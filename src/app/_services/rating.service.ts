import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Rating, RatingRequest, User } from '@app/_models';

import { RegistrationUser } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private http: HttpClient
  ) { }

  addRating(ratingRequest: RatingRequest) {
    return this.http.post<Rating>(`${environment.apiDotnetUrl}/api/Table/AddRating`, ratingRequest);
    //return "alma";
  }
}
