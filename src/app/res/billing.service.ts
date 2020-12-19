import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()

export class BillingService {

  public tableId!: number;

  private billingTable!: any;
  private tablesPath = "tables";
  private tablesRef!: AngularFireList<any>;

  constructor(public db: AngularFireDatabase) {
    this.tablesRef = this.db.list(this.tablesPath);
  }

  setTableId(id: number) {
    this.tableId = id;
    this.db.list(this.tablesPath, ref => ref.orderByChild('id').equalTo(id))
      .snapshotChanges().subscribe(tables => {
        this.billingTable = tables[0];
      });
  }

  cancelBilling() {
    this.tablesRef.update(this.billingTable.key, { 'status': 2 });
  }

  billedTable() {
    this.tablesRef.update(this.billingTable.key, { 'status': 1 })
  }

}
