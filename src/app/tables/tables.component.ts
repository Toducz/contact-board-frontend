import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

import { AuthenticationService, TableService, DefaultTableService, InvitationService } from '@app/_services';
import { Table } from '@app/_models/tables';
import { User } from '@app/_models';



interface MyBoard {
  tableName: string;
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

  displayedColumns: string[] = ['table-name', 'created-person', 'description'];
  dataSource: Table[];

  defaultTableId?: Number | null;
  firstDefaultTableId?: Number | null;
  user?: User | null;


  myBoardData: MyBoard[];
  myBoardDisplayedColumns: string[] = ['board-name', 'delete'];
  clickedRows = new Set<MyBoard>();


  invitationBoardData: InvitationBoardData[];
  invitationBoardDataDisplayedColumns: string[] = ['tableName1', 'sentInvitationEmail', "description", "confirmed", "delete-ic"];


  constructor(
    private authenticationService: AuthenticationService,
    private tableService: TableService,
    private defaultTableService: DefaultTableService,
    private invitationService: InvitationService
  ) {
    console.log("Kcs");
    this.dataSource = [];
    this.defaultTableId = defaultTableService.tableId.getValue()?.id;
    this.firstDefaultTableId = defaultTableService.tableId.getValue()?.id;
    this.defaultTableService.tableId?.subscribe(x => this.defaultTableId = x?.id);


    this.myBoardData = [];
    
    this.invitationBoardData = [
      {
        tableName: "string",
        invitationId: 12,
        sentInvitationEmail: "string",
        description: "string",
        confirmed: true 
      },
      {
        tableName: "string",
        invitationId: 12,
        sentInvitationEmail: "string",
        description: "string",
        confirmed: true 
      },
      {
        tableName: "string",
        invitationId: 12,
        sentInvitationEmail: "string",
        description: "string",
        confirmed: true 
      }
    ];
  }

  changeDefaultTableId(row: any) {
    this.defaultTableId = row.id;
    this.defaultTableService.tableId?.next(row);
  }

  ngOnInit(): void {
    this.getBoard();
    this.getInvitations();
  }

  ngOnDestroy() {

    if( this.firstDefaultTableId != this.defaultTableId ){
        this.defaultTableService.updateOrAddDefaultTableId();
    }

    console.log("vege");
  }
  
  deleteMyBoard(element: any){
    this.clickedRows.add(element);
    console.log("mivagyunk a grund!");
    console.log(element.tableId);

    this.tableService.deleteTable(element.tableId)
      .subscribe(
        (next) => {
          console.log(`delete ${element.tableName}`);
        },
        (error) => {
          console.log("Some error delete Table = ", error);
        }
      )
  }

  getMyBoard(){

    let myBoard: MyBoard[] = [];

    for( let index in this.dataSource ){
      if( this.dataSource[index].userEmailOwner == this.user?.email ){
        myBoard.push({
          tableName: this.dataSource[index].tableName,
          tableId: this.dataSource[index].id
        })
      }
    }
    this.myBoardData = myBoard;
  }

  getBoard() {

    this.user = this.authenticationService.currentUserValue;

    if (this.user == null) {
      return;
    }
    
    this.tableService.getTable(this.user.email!).subscribe(
      (tables) => {
        console.log(tables);
        this.dataSource = tables;
        this.getMyBoard();

      },
      (error) => {
        console.log(error);
      }
    )
  }

  getInvitations() {

    this.user = this.authenticationService.currentUserValue;

    if (this.user == null) {
      return;
    }
    
    this.invitationService.getInvitations(this.user.email!).subscribe(
      (invitation) => {
        console.log(invitation);
        this.invitationBoardData = invitation;
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
