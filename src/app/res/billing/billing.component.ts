import { Component, OnInit } from '@angular/core';
import { BillingService } from '../billing.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  orders!: any[];
  orderStatus = ["pending", "preparing", "served"];
  totalPrice: number = 0;

  ordersPath = "orders";
  ordersRef!: AngularFireList<any>;
  transPath = "transactions";
  transRef!: AngularFireList<any>;
  inactivePath = "inactive-orders";
  inactiveRaf!: AngularFireList<any>;

  constructor(public billingService: BillingService, private db: AngularFireDatabase) {
    this.ordersRef = db.list(this.ordersPath);
    this.transRef = db.list(this.transPath);
    this.inactiveRaf = db.list(this.inactivePath);

    db.list(this.ordersPath, ref => ref.orderByChild('table').equalTo(billingService.tableName))
      .snapshotChanges().subscribe(orders => {
        this.orders = orders;
      });
  }

  ngOnInit(): void {
  }

  getTotal() {
    const served = (element: any) => element.payload.val().status == 2;
    if (!this.orders.every(served)) {
      this.totalPrice = -1;
      return;
    }
    this.totalPrice = 0;
    this.orders.forEach(order => {
      this.totalPrice = this.totalPrice + order.payload.val().price;
    });
  }

  serveOrder(order: any) {
    this.ordersRef.update(order.key, { 'status': 2 });
  }

  cancelBilling() {
    this.billingService.cancelBilling();
  }

  bill() {
    const [date, time] = this.getDateTime();
    const key = this.transRef.push({
      'date': date,
      'time': time,
      'table': this.billingService.tableName,
      'total': this.totalPrice
    }).key;
    this.moveOrdersToInactive(key);
    this.billingService.billedTable();
  }

  moveOrdersToInactive(key: any) {
    let dish: string;
    let price: number;
    this.orders.forEach(order => {
      dish = order.payload.val().dish;
      price = order.payload.val().price;
      this.inactiveRaf.push({
        'trans-key': key,
        'dish': dish,
        'price': price
      })
      this.ordersRef.remove(order.key);
    });
  }

  getDateTime() {
    const now = new Date();
    let dd = now.getDate();
    let mm = Number(now.getMonth()) + 1;
    let yy = now.getFullYear();
    const date = dd + "." + mm + "." + yy;
    let hh = now.getHours();
    let mn = ("0" + now.getMinutes()).slice(-2);
    const time = hh + ":" + mn;
    return [date, time];
  }

}
