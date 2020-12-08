import { Component, OnInit } from '@angular/core';
import { CusNavService } from '../cus-nav.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  tableName!: string;
  ordersPath = "orders";
  orders!: any[];
  orderStatus = ["pending", "preparing", "served"];
  ordersRef!: AngularFireList<any>;

  constructor(private cusNavService: CusNavService, private db: AngularFireDatabase) {
    this.tableName = cusNavService.getTableName();
    console.log("tableId: " + this.tableName);

    this.ordersRef = db.list(this.ordersPath);
    db.list(this.ordersPath, ref => ref.orderByChild('table').equalTo(this.tableName))
      .snapshotChanges().subscribe(orders => {
        this.orders = orders;
        console.log(this.orders);
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
