import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  tableList!: any[];
  tableStatus = ["unavailable", "available", "in-service", "billing"];
  tablesPath = "tables";
  tablesRef!: AngularFireList<any>;

  constructor(db: AngularFireDatabase, public billingService: BillingService) {

    this.tablesRef = db.list(this.tablesPath);
    db.list(this.tablesPath).snapshotChanges()
      .subscribe(tables => {
        this.tableList = tables;
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
    this.billingService.setTableName(table.payload.val().name);
  }

}
