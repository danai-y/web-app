import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  ordersPath = "orders";
  ordersRef!: AngularFireList<any>;
  orderList!: Observable<any>;
  orderStatus = ["pending", "preparing", "served"];

  constructor(db: AngularFireDatabase) {
    this.ordersRef = db.list(this.ordersPath);
    this.orderList = this.ordersRef.snapshotChanges();
  }

  ngOnInit(): void {
  }

  prepareOrder(order: any) {
    this.ordersRef.update(order.key, { 'status': 1 });
  }

  serveOrder(order: any) {
    this.ordersRef.update(order.key, { 'status': 2 });
  }

  cancelOrder(order: any) {
    this.ordersRef.remove(order.key);
  }

}
