import { Component, OnInit } from '@angular/core';
import { TableFormService } from '../table-form.service';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css']
})
export class TableFormComponent implements OnInit {

  tableName!: string;
  tableKey!: string;

  constructor(public tableFormService: TableFormService) {
    this.tableKey = tableFormService.tableKey;
    if (this.tableKey != '0') {
      this.tableName = tableFormService.table.name;
    }
  }

  ngOnInit(): void {
  }

  saveTable() {
    if (this.tableKey == '0') {
      this.tableFormService.addTable(this.tableName);
    } else {
      console.log(this.tableName);
      this.tableFormService.editTable(this.tableName, this.tableKey);
    }
  }

}
