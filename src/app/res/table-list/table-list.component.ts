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
  tablesRef!: AngularFireList<any>;

  constructor(
    private db: AngularFireDatabase,
    private billingService: BillingService
  ) {
    this.tablesRef = this.db.list('tables');
    this.tablesRef.snapshotChanges().subscribe(tables => {
      this.tableList = tables;
      this.tableList.forEach(table => {
        if (table.payload.val().status == 2) {
          db.list('orders', ref => ref.orderByChild('table').equalTo(table.payload.val().id))
            .valueChanges().subscribe(orders => {
              if (orders.length == 0) {
                this.enableTable(table);
              }
            })
        }
      })
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
    this.billingService.setTableId(table.payload.val().id);
  }

}
