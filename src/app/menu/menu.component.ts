import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import Order from '../models/order';
import { CusNavService } from '../services/cus-nav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  ordersRef: AngularFireList<any> | undefined;
  menu: any[] | undefined;
  tableId!: number;
  order: Order = new Order();
  menuPath = "menu";
  ordersPath = "orders";

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private cusNavService: CusNavService,
  ) {
    this.ordersRef = db.list(this.ordersPath);
    db.list(this.menuPath).valueChanges()
      .subscribe(menu => {
        this.menu = menu;
      });
  }

  ngOnInit(): void {
  }

  addOrder(id: string) {
    this.tableId = this.cusNavService.getTableId();
    this.order.dishId = Number(id);
    this.order.served = 0;
    this.order.tableId = Number(this.tableId);
    this.ordersRef?.push(this.order);
    console.log("table " + this.tableId + " -- dish " + id);
  }

}
