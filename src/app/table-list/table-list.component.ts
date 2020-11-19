import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  tableList: any[] | undefined;
  constructor(db: AngularFireDatabase) {
    db.list('tables').valueChanges()
    .subscribe(tables => {
      this.tableList = tables;
    });
  }
  ngOnInit(): void {
  }

}
