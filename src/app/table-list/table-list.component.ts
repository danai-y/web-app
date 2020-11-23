import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  tablesPath = "tables";
  tableList!: any[];
  tableStatus = ["unavailable", "available", "in-service", "billing"];
  tablesRef!: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {

    this.tablesRef = db.list(this.tablesPath);
    db.list(this.tablesPath).snapshotChanges()
      .subscribe(tables => {
        this.tableList = tables;
        console.log(this.tableList);
      });
  }

  ngOnInit(): void {
  }

  enableTable(table: any) {
    this.tablesRef.update(table.key, { 'status': 1 })
  }

  disableTable(table: any) {
    this.tablesRef.update(table.key, { 'status': 0 })
  }

  billTable(table: any) {
    
  }

}
