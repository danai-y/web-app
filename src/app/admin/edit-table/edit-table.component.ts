import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {

  tablesPath = "tables";
  tableList!: any[];
  tablesRef!: AngularFireList<any>;

  constructor(db: AngularFireDatabase) { 
    this.tablesRef = db.list(this.tablesPath);
    db.list(this.tablesPath).snapshotChanges()
      .subscribe(tables => {
        this.tableList = tables;
      });
  }

  ngOnInit(): void {
  }

  addTable() {
    var id = this.tableList.length + 1;
    this.tablesRef.push({'id': id, 'status': 0});
  }

  deleteTable() {
    var lastKey = this.tableList[this.tableList.length-1].key;
    this.tablesRef.remove(lastKey);
  }

}
