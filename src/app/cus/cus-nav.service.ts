import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Subject } from 'rxjs';

@Injectable()

export class CusNavService {

  public tableId!: number;
  public noTable$ = new Subject<number>();
  public activateWildCard$ = new Subject<boolean>();
  private table!: any;
  private tablesRef!: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.tablesRef = this.db.list("tables");
    this.tablesRef.valueChanges().subscribe(items => {
      this.noTable$.next(items.length);
    })
  }

  setTableId(id: number) {
    this.tableId = id;
    this.db.list("tables", ref => ref.orderByChild('id').equalTo(this.tableId)).snapshotChanges().subscribe(tables => {
      this.table = tables[0];
      if (this.table.payload.val().status == 0) {
        this.activateWildCard$.next(true);
      }
    });
  }

  billTable() {
    this.tablesRef.update(this.table.key, { 'status': 3 });
  }

  inService() {
    if (this.table.payload.val().status != 2) {
      this.tablesRef.update(this.table.key, { 'status': 2 });
    }
  }

}
