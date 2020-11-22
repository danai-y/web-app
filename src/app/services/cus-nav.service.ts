import { Injectable } from '@angular/core';

@Injectable()

export class CusNavService {

  tableId: number | undefined;

  constructor() { }

  setTableId(id: number) {
    this.tableId = id;
    console.log("set tableId: " + this.tableId);
  }

  getTableId(): any {
    return this.tableId;
  }
}
