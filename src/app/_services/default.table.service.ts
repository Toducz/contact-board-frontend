import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

import { AuthenticationService } from '@app/_services';
import { Table } from '@app/_models/tables';



@Injectable({ providedIn: 'root' })
export class DefaultTableService {

    public tableId: BehaviorSubject<Table | null> = new BehaviorSubject<Table | null>(null);
    public user?: User | null;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) {
    }

    getDefaultTableId() {

        this.user = this.authenticationService.currentUserValue;

        if (this.user == null || this.user == undefined) {
            return;
        }

        console.log(this.user);

        let params = new HttpParams().set("userEmail", this.user.email!);

        this.http.get<any>(`${environment.apiDotnetUrl}/api/DefaultTable`, { params: params })
            .subscribe(
                (next) => {
                    console.log(next);
                    console.log("DS.ok");
                    this.tableId?.next(next);
                },
                (error) => {
                    console.log(error + "DefaultTableId service error");
                }
            );
    }

    updateOrAddDefaultTableId() {


        if (this.user == null || this.tableId.getValue() == null) {
            return;
        }
 
        let paci = { userEmail: this.user.email, tableId: this.tableId.getValue()?.id };

        console.log(paci);

        this.http.put<any>(`${environment.apiDotnetUrl}/api/DefaultTable`, paci)
            .subscribe(
                (next) => {
                    console.log(next + "  update defaultTableId");
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}