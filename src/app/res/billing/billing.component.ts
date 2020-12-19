import { Component, OnInit } from '@angular/core';
import { BillingService } from '../billing.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  orders!: any[];
  orderStatus = ["pending", "preparing", "served"];
  allServed: boolean = false;
  totalPrice$!: Observable<number>;
  addPrice!: number;

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

    db.list(this.ordersPath, ref => ref.orderByChild('table').equalTo(billingService.tableId))
      .snapshotChanges().subscribe(orders => {
        this.orders = orders;
        let totalPrice = 0;
        this.orders.forEach(order => {
          totalPrice = totalPrice + order.payload.val().price;
        });
        this.totalPrice$ = of(totalPrice);
        const served = (element: any) => element.payload.val().status == 2;
        this.allServed = this.orders.every(served)
      });
  }

  ngOnInit(): void {
  }

  getTotal() {


  }

  serveOrder(order: any) {
    this.ordersRef.update(order.key, { 'status': 2 });
  }

  cancelBilling() {
    this.billingService.cancelBilling();
  }

  bill() {
    if (!this.addPrice) {
      this.addPrice = 0;
    }
    let totalPrice;
    this.totalPrice$.subscribe(t => { totalPrice = t });
    const [date, time] = this.getDateTime();
    const key = this.transRef.push({
      'date': date,
      'time': time,
      'table': this.billingService.tableId,
      'total': Number(totalPrice) + Number(this.addPrice)
    }).key;
    this.moveOrdersToInactive(key);
    this.billingService.billedTable();
  }

  moveOrdersToInactive(key: any) {
    this.orders.forEach(order => {
      this.inactiveRaf.push({
        'trans-key': key,
        'dish': order.payload.val().dish,
        'price': order.payload.val().price,
        'note': order.payload.val().note
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

  cancelOrder(order: any) {
    this.ordersRef.remove(order.key);
  }

}
