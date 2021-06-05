import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  menuRef!: AngularFireList<any>;
  menu!: any[];
  categories!: any;

  constructor(private db: AngularFireDatabase,) {
    this.menuRef = this.db.list('menu');
    this.db.list('categories').valueChanges().subscribe(items => {
      this.categories = items;
    });
    db.list('menu', ref => ref.orderByChild('category')).snapshotChanges().subscribe(menu => {
      this.menu = menu;
    });
  }

  ngOnInit(): void {
  }

  enableDish(dish: any) {
    this.menuRef.update(dish.key, { 'status': 1 })
  }

  disableDish(dish: any) {
    this.menuRef.update(dish.key, { 'status': 0 })
  }

}
