import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { CreateTable, User } from '@app/_models';

import { RegistrationUser } from '@app/_models';


@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private http: HttpClient
  ) { }

  createTable(createTable: CreateTable) {
    return this.http.post<any>(`${environment.apiDotnetUrl}/api/Table/AddTable`, createTable);
  }

  getTable(userEmail: string){

    let params = new HttpParams().set("userEmail", userEmail);

    return this.http.get<any>(`${environment.apiDotnetUrl}/api/Table/GetMyTable`, {params: params} );
  }

  deleteTable(tableId: number){


    let params = new HttpParams().set("id", tableId);

    return this.http.delete<any>(`${environment.apiDotnetUrl}/api/Table`, {params: params} );

  }

  setDefaultTable(tableId: number, userEmail: string){

    return this.http.post<any>(`${environment.apiDotnetUrl}/api/Table/SetDefaultTable`, { tableId, userEmail });

  }

  getUsersByEmail(emails: string[]){

    return this.http.post<any>(`${environment.apiDotnetUrl}/api/Table/getUsers`, emails);
  }

}