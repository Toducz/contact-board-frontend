import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

import { RegistrationUser } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private http: HttpClient
  ) { }

  registration(registrationUser: RegistrationUser) {
    return this.http.post<any>(`${environment.apiDotnetUrl}/api/Authenticate/register`, registrationUser);
  }
}
