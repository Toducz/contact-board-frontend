import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, DefaultTableService } from './_services';
import { User } from './_models';
import { Table } from './_models/tables';

@Component({ 
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'] 
 })
export class AppComponent {
    currentUser?: User | undefined | null;
    defaultTable?: Table | null;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private defaultTableService: DefaultTableService
    ) {
        this.authenticationService.currentUser.subscribe(
            x => {
                this.currentUser = x;
                defaultTableService.getDefaultTableId();
            });


        defaultTableService.table?.subscribe(x => {
            this.defaultTable = x;
            console.log(this.defaultTable);
        } );
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}