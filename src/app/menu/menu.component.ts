import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
=======
import Order from '../models/order';
>>>>>>> ae38e9a344a48a8af7820db057b6c2252caf25a4
import { CusNavService } from '../services/cus-nav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

<<<<<<< HEAD
  ordersRef!: AngularFireList<any>;
  menu: any[] | undefined;
  tableId!: number;
=======
  ordersRef: AngularFireList<any> | undefined;
  menu: any[] | undefined;
  tableId!: number;
  order: Order = new Order();
>>>>>>> ae38e9a344a48a8af7820db057b6c2252caf25a4
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

<<<<<<< HEAD
  addOrder(dish: any) {
    this.tableId = this.cusNavService.getTableId();
    this.ordersRef.push({'dishName': dish.name, 'tableId': Number(this.tableId), 'price': dish.price, 'status': 0});
    console.log("table: " + this.tableId + " ORDER dish: " + dish.name);
=======
  addOrder(id: string) {
    this.tableId = this.cusNavService.getTableId();
    this.order.dishId = Number(id);
    this.order.served = 0;
    this.order.tableId = Number(this.tableId);
    this.ordersRef?.push(this.order);
    console.log("table " + this.tableId + " -- dish " + id);
>>>>>>> ae38e9a344a48a8af7820db057b6c2252caf25a4
  }

}
