import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { CusNavService } from '../cus-nav.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  animal!: string;
  name!: string;

  ordersRef!: AngularFireList<any>;
  menu!: any[];
  tableName!: string;
  menuPath = "menu";
  ordersPath = "orders";

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private cusNavService: CusNavService,
    public dialog: MatDialog
  ) {
    this.ordersRef = db.list(this.ordersPath);
    db.list(this.menuPath).valueChanges()
      .subscribe(menu => {
        this.menu = menu;
      });
  }

  ngOnInit(): void {
  }

  addOrder(order: any) {
    if (!order.note) {
      order.note = "-";
    }
    this.tableName = this.cusNavService.getTableName();
    this.ordersRef.push({
      'dish': order.dish,
      'table': this.tableName,
      'price': Number(order.price),
      'status': 0,
      'note': order.note
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

