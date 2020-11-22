import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  dbPath = "orders";
  orderList: any[] | undefined;

  constructor(db: AngularFireDatabase) {
    db.list(this.dbPath).valueChanges()
      .subscribe(orders => {
        this.orderList = orders;
        console.log(this.orderList);
      });
  }

  ngOnInit(): void {
  }

}
