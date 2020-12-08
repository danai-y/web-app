import { Component, OnInit } from '@angular/core';
import { CusNavService } from '../cus-nav.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  ordersPath = "orders";
  orders!: any[];
  noOrders: number = 0;
  orderStatus = ["pending", "preparing", "served"];
  ordersRef!: AngularFireList<any>;

  constructor(private cusNavService: CusNavService, private db: AngularFireDatabase) {
    this.ordersRef = db.list(this.ordersPath);
    db.list(this.ordersPath, ref => ref.orderByChild('table').equalTo(cusNavService.getTableName()))
      .snapshotChanges().subscribe(orders => {
        this.orders = orders;
        this.noOrders = orders.length;
      });
  }

  ngOnInit(): void {
  }

  cancelOrder(order: any) {
    this.ordersRef.remove(order.key);
  }

  billTable() {
    this.cusNavService.billTable();
  }

}
