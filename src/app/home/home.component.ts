import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Rating, User } from '@app/_models';
import { AuthenticationService, DefaultTableService, TableService, UserService } from '@app/_services';
import { Table } from '@app/_models/tables';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

import * as moment from 'moment-timezone';



@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent {

    ratingGroupedByDate: { [id: string]: Rating[] } = {};
    ratings: Rating[] = [];
    tableExist: boolean = true;
    ratingsExist: boolean = true;
    sortedRatingDate: string[] = [];
    userNamesByEmail: BehaviorSubject<{ [id: string]: string }> = new BehaviorSubject<{ [id: string]: string }>({});
    moment = moment();


    constructor(
        private autentificationService: AuthenticationService,
        private defaultTableService: DefaultTableService,
        private tableService: TableService
    ) {
    }

    work(table: Table) {

        let ratings = table.ratings!;

        let ratingGroupedByDate: { [id: string]: Rating[] } = {};

        ratingGroupedByDate[ratings[0].creationDate.substring(0, 10)] = [ratings[0]];

        for (let index=1; index< ratings.length ; index++) {
            if (ratings[index].creationDate.substring(0, 10) in ratingGroupedByDate) {
                ratingGroupedByDate[ratings[index].creationDate.substring(0, 10)].push(ratings[index]);
            } else {
                ratingGroupedByDate[ratings[index].creationDate.substring(0, 10)] = [ratings[index]];
            }
        }

        let sortedRatingDate = Object.keys(this.ratingGroupedByDate);

        sortedRatingDate.sort((a: string, b: string) => {
            let d1: Date = new Date(a)
            let d2: Date = new Date(b)

            if (d1 < d2) {
                return -1;
            }

            return 1;
        })

        this.ratingGroupedByDate = ratingGroupedByDate;
        this.sortedRatingDate = sortedRatingDate;

        this.tableExist = true;
        this.ratingsExist = true;

        
        let usersEmail: string[] = []

        for(let i = 0 ; i < ratings.length ; i++){
            if(usersEmail.findIndex( (x ) => x == ratings[i].userForeignKey ) == -1){
                usersEmail.push(ratings[i].userForeignKey!);
            }
        }

        this.tableService.getUsersByEmail(usersEmail).subscribe(
            (next) =>{
                
                let userNameByEmail: { [id: string]: string } = {}; 

                for(let i=0 ; i < next.length ; i++){
                    if(!(next[i].userEmail in userNameByEmail)){
                        userNameByEmail[next[i].userEmail] = next[i].lastName
                    }
                }

                this.userNamesByEmail.next(userNameByEmail);
                
            },
            (error) => {
                console.log(error)
            }
        )

    }

    getHour(date: string){
        return moment(date).tz("Europe/Bucharest").toString().substring(16, 24);
    }

    getDay(date: string){
        return moment(date).tz("Europe/Bucharest").toString().substring(0, 15);
    }

    getDate(date: string){
        return moment(date).tz("Europe/Bucharest").toString();
    }


    ngOnInit() {

        
        this.defaultTableService.table.subscribe( table =>{

            if (table == null || table == undefined) {
                this.tableExist = false;
                return;
            }

            if(table.ratings == null || table.ratings == undefined || table.ratings!.length == 0){
                this.ratingsExist = false;
                this.tableExist = true;
                return;
            }
            
            this.work(table);

        })
        
        this.defaultTableService.getDefaultTableId();
    }
}