import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CusNavService } from '../cus-nav.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  ordersRef!: AngularFireList<any>;
  menu!: any;
  categories!: any;

  constructor(
    private db: AngularFireDatabase,
    private cusNavService: CusNavService,
    private dialog: MatDialog,
  ) {
    this.ordersRef = this.db.list('orders');
    this.db.list('categories').valueChanges().subscribe(items => {
      this.categories = items;
    });
    this.db.list('menu', ref => ref.orderByChild('category')).valueChanges().subscribe(items => {
      this.menu = items;
    });
  }

  ngOnInit(): void {
  }

  addOrder(order: any) {
    let tableId = this.cusNavService.tableId;
    this.ordersRef.push({
      'dish': order.dish,
      'table': tableId,
      'price': Number(order.price),
      'status': 0,
      'note': (order.note) ? order.note : "-"
    });
    this.cusNavService.inService();
  }

  openDialog(dish: any) {
    const dialogRef = this.dialog.open(AddOrderDialog, {
      width: '250px',
      data: { dish: dish.name, price: dish.price }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addOrder(result);
      }
    });
  }

}

export interface Order {
  dish: string;
  price: number;
  note: string;
}

@Component({
  selector: 'add-order-dialog',
  templateUrl: 'add-order-dialog.html',
})
export class AddOrderDialog {

  constructor(
    public dialogRef: MatDialogRef<AddOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

