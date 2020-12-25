import { Component, OnInit } from '@angular/core';
import { CusNavService } from '../cus-nav.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders!: any[];
  noOrders!: number;
  orderStatus = ["pending", "preparing", "served"];

  constructor(
    private cusNavService: CusNavService,
    private db: AngularFireDatabase
  ) {
    db.list('orders', ref => ref.orderByChild('table').equalTo(cusNavService.tableId))
      .snapshotChanges().subscribe(orders => {
        this.orders = orders;
        this.noOrders = orders.length;
      });
  }

  ngOnInit(): void {
  }

  cancelOrder(order: any) {
    this.db.list('orders').remove(order.key);
  }

  billTable() {
    this.cusNavService.billTable();
  }

}
