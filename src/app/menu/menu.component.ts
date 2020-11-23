import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { CusNavService } from '../services/cus-nav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  ordersRef!: AngularFireList<any>;
  menu!: any[];
  tableId!: number;
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

  addOrder(dish: any) {
    this.tableId = this.cusNavService.getTableId();
    this.ordersRef.push({'dishName': dish.name, 'tableId': Number(this.tableId), 'price': dish.price, 'status': 0});
    console.log("table: " + this.tableId + " ORDER dish: " + dish.name);
  }

}
