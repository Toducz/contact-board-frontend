import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

import { AuthenticationService, TableService, DefaultTableService, InvitationService } from '@app/_services';
import { Table } from '@app/_models/tables';
import { User } from '@app/_models';
import { ToastrService } from 'ngx-toastr';

import {Router} from '@angular/router';

import { ActivatedRoute } from '@angular/router';



interface MyBoard {
  tableName: string | undefined;
  tableId: number;
}

interface InvitationBoardData {
  tableName: string;
  invitationId: number;
  sentInvitationEmail: string;
  description: string;
  confirmed: boolean; 
}


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  displayedColumns: string[] = ['table-name', 'details', 'default'];
  dataSource: Table[];

  user?: User | null;


  constructor(
    private authenticationService: AuthenticationService,
    private tableService: TableService,
    private defaultTableService: DefaultTableService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.dataSource = [];
  }

  ngOnInit(): void {
    this.getBoard();
  }


  detail(element: any){
    let str = JSON.stringify(element);
    
    this.router.navigate(
      ['/details'],
      { queryParams: {table: str} }
    );
    
    
  }

  default(element: any){
 
    let email: string | undefined=  this.authenticationService.currentUserValue?.email

    if (email == undefined){
      this.toastr.error("Something went wrong!");
      return;
    }

    this.tableService.setDefaultTable(element.id, email)
      .subscribe(
        (next) => {
          this.defaultTableService.setDefaultTable(element)
          console.log(element)
        }
      );
  }

 
  getBoard() {

    this.user = this.authenticationService.currentUserValue;

    if (this.user == null) {
      return;
    }
    
    this.tableService.getTable(this.user.email!).subscribe(
      (tables) => {
        this.dataSource = tables;
      },
      (error) => {

      }
    )
  }
  
}
