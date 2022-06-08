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

    public table: BehaviorSubject<Table | null> = new BehaviorSubject<Table | null>(null);
    public user?: User | null;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) {
    }

    setDefaultTable(table: Table){
        this.table.next(table);
    }

    getDefaultTableId() {

        this.user = this.authenticationService.currentUserValue;

        if (this.user == null || this.user == undefined) {
            return;
        }



        let params = new HttpParams().set("userEmail", this.user.email!);

        this.http.get<Table>(`${environment.apiDotnetUrl}/api/Table/GetDefaultTable`, { params: params })
            .subscribe(
                (next) => {

                    this.table?.next(next);
                },
                (error) => {
                }
            );
    }

    updateOrAddDefaultTableId() {

        /*
        if (this.user == null || this.table.getValue() == null) {
            return;
        }*/
        if (this.user == null) {
            return;
        }

        let paci = { userEmail: this.user.email, tableId: this.table.getValue()?.id };

        this.http.put<any>(`${environment.apiDotnetUrl}/api/DefaultTable`, paci)
            .subscribe(
                (next) => {

                },
                (error) => {
                }
            );
    }
}