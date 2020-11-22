import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  tablesPath = "tables";
  tableList: any[] | undefined;

  constructor(db: AngularFireDatabase) {
    db.list(this.tablesPath).valueChanges()
    .subscribe(tables => {
      this.tableList = tables;
      console.log(this.tableList);
    });
  }
  
  ngOnInit(): void {
  }

}
