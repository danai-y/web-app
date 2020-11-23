import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
=======
import { AngularFireDatabase } from '@angular/fire/database';
>>>>>>> ae38e9a344a48a8af7820db057b6c2252caf25a4

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

<<<<<<< HEAD
  ordersPath = "orders";
  orderList: any[] | undefined;
  keys: any[] | undefined;
  ordersRef!: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {

    this.ordersRef = db.list(this.ordersPath);
    db.list(this.ordersPath).snapshotChanges()
=======
  dbPath = "orders";
  orderList: any[] | undefined;

  constructor(db: AngularFireDatabase) {
    db.list(this.dbPath).valueChanges()
>>>>>>> ae38e9a344a48a8af7820db057b6c2252caf25a4
      .subscribe(orders => {
        this.orderList = orders;
        console.log(this.orderList);
      });
  }

  ngOnInit(): void {
  }

  serveOrder(order: any) {
    this.ordersRef.update(order.key, { 'status': 1 });
    console.log(order.key);
  }

}
