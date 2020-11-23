import { Injectable } from '@angular/core';

@Injectable()

export class CusNavService {

<<<<<<< HEAD
  tableId!: number;
=======
  tableId: number | undefined;
>>>>>>> ae38e9a344a48a8af7820db057b6c2252caf25a4

  constructor() { }

  setTableId(id: number) {
    this.tableId = id;
    console.log("set tableId: " + this.tableId);
  }

  getTableId(): any {
    return this.tableId;
  }
}
