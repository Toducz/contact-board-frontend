import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Rating, User } from '@app/_models';

import { RegistrationUser } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class InvitationService{

  constructor(
    private http: HttpClient
  ) { }

  getInvitations(userEmail: string) {
    console.log("Invitation");
    
    let params = new HttpParams().set("userEmail", userEmail);

    return this.http.get<any>(`${environment.apiDotnetUrl}/api/Invitation`, {params: params});
  }
}
