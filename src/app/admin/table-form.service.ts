import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()

export class TableFormService {

  tableKey!: string;
  tablesPath = "tables";
  tableList!: any[];
  tablesRef!: AngularFireList<any>;
  table!: any;

  constructor(db: AngularFireDatabase) { 
    this.tablesRef = db.list(this.tablesPath);
    db.list(this.tablesPath).snapshotChanges()
      .subscribe(tables => {
        this.tableList = tables;
      });
  }

  setKey(key: string) {
    this.tableKey = key;
  }

  setTable(table: any) {
    this.table = table;
  }

  addTable(name: string) {
    var id = this.tableList.length + 1;
    this.tablesRef.push({'id': id, 'name': name, 'status': 0});
  }

  editTable(name: string, key: string) {
    this.tablesRef.update(key, {'name': name});
  }

}
