import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  ordersPath = "orders";
  orderList: any[] | undefined;
  keys: any[] | undefined;
  ordersRef!: AngularFireList<any>;

  constructor(db: AngularFireDatabase) {

    this.ordersRef = db.list(this.ordersPath);
    db.list(this.ordersPath).snapshotChanges()
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
