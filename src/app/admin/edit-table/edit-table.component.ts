import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { TableFormService } from '../table-form.service';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {

  tablesPath = "tables";
  tableList!: any[];
  tablesRef!: AngularFireList<any>;

  constructor(db: AngularFireDatabase, public tableFormService: TableFormService) { 
    this.tablesRef = db.list(this.tablesPath);
    db.list(this.tablesPath).snapshotChanges()
      .subscribe(tables => {
        this.tableList = tables;
      });
  }

  ngOnInit(): void {
  }

  addTable() {
    this.tableFormService.setKey('0');
  }

  disableTable(table: any) {
    this.tablesRef.update(table.key, { 'status': 0 })
  }

  editKeyTable(key: any, table: any) {
    this.tableFormService.setKey(key);
    this.tableFormService.setTable(table);
  }

  deleteTable() {
    var lastKey = this.tableList[this.tableList.length-1].key;
    this.tablesRef.remove(lastKey);
  }

}
