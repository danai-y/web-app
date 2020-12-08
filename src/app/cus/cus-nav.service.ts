import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()

export class CusNavService {

  tableId!: number;
  private table!: any;
  private tablesPath = "tables";
  private tablesRef!: AngularFireList<any>;

  constructor(public db: AngularFireDatabase) { 
    this.tablesRef = this.db.list(this.tablesPath);
  }

  setTableId(id: number) {
    this.tableId = id;
    this.db.list(this.tablesPath, ref => ref.orderByChild('id').equalTo(this.tableId))
    .snapshotChanges().subscribe(tables => {
      this.table = tables[0];
    });
  }

  getTableName(): string {
    return this.table.payload.val().name;
  }

  billTable() {
    this.tablesRef.update(this.table.key, {'status': 3});
  }
}
