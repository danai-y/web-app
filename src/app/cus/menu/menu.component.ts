import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { CusNavService } from '../cus-nav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  ordersRef!: AngularFireList<any>;
  menu!: any[];
  tableName!: string;
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
    this.tableName = this.cusNavService.getTableName();
    this.ordersRef.push({'dish': dish.name, 'table': this.tableName, 'price': Number(dish.price), 'status': 0});
    console.log("table: " + this.tableName + " ORDER dish: " + dish.name);
  }

}
