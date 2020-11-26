import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CusNavService } from '../cus-nav.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  tableId!: number;
  ordersPath = "orders";
  orders!: any[];
  orderStatus = ["pending", "preparing", "served"];
  ordersRef!: AngularFireList<any>;

  constructor(
    private route: ActivatedRoute,
    private cusNavService: CusNavService,
    private db: AngularFireDatabase,
  ) {
    this.tableId = cusNavService.getTableId();
    console.log("tableId: " + this.tableId);

    this.ordersRef = db.list(this.ordersPath);
    db.list(this.ordersPath, ref => ref.orderByChild('tableId').equalTo(this.tableId))
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

}
