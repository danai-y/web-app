import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { MenuFormService } from '../menu-form.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {

  menuRef!: AngularFireList<any>;
  menu!: any[];

  constructor(
    private db: AngularFireDatabase,
    public menuFormService: MenuFormService
  ) {
    this.menuRef = db.list("menu");
    db.list("menu", ref => ref.orderByChild('category')).snapshotChanges().subscribe(items => {
      this.menu = items;
    });
  }

  ngOnInit(): void {
  }

  addDish() {
    this.menuFormService.setKey('0');
  }

  editKeyDish(key: any, dish: any) {
    this.menuFormService.setKey(key);
    this.menuFormService.setDish(dish);
  }

  deleteDish(key: any) {
    this.menuRef.remove(key);
  }

  disableDish(dish: any) {
    this.menuRef.update(dish.key, { 'status': 0 })
  }

}
