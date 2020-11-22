import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CusNavService } from '../services/cus-nav.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  tableId!: number;
  ordersPath = "orders";
  orders: any[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private cusNavService: CusNavService,
    private db: AngularFireDatabase,
  ) {
    this.tableId = cusNavService.getTableId();
    console.log("tableId: " + this.tableId);

    db.list(this.ordersPath, ref => ref.orderByChild('tableId').equalTo(this.tableId))
    .valueChanges()
    .subscribe(orders =>{
      this.orders = orders;
      console.log(this.orders);
    });
  }

  ngOnInit(): void {
  }

}
