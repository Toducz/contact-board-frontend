import { Component, OnInit, Input } from '@angular/core';
import { Table } from '@app/_models/tables';
import { DefaultTableService } from '@app/_services';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { FormControl } from '@angular/forms';

import * as moment from 'moment-timezone';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  disableSelect = new FormControl(false);
  tableExist: boolean = true;
  language: string | null = null;
  table: BehaviorSubject<Table | null> = new BehaviorSubject<Table | null>(null);
  moment = moment();

  constructor(
    private defaultTableService: DefaultTableService,
    private route: ActivatedRoute,

  ) {
  }

  getDate(date: string) {
    return moment(date).tz("Europe/Bucharest").toString().substring(0, 24);
  }

  ngOnInit(): void {

    //console.log(this.table);

    this.route.queryParams.subscribe(
      params => {
        console.log(params['table'])
        let p = JSON.parse(params['table']);
        console.log(p);
        this.table.next(p!);

        console.log(this.table.value?.tableName);

      }
    )





  }
}
