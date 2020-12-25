import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormService } from '../form.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['../edit.style.css']
})
export class EditMenuComponent implements OnInit {

  menuRef!: AngularFireList<any>;
  menu!: any[];

  constructor(
    private db: AngularFireDatabase,
    public formService: FormService
  ) {
    this.menuRef = this.db.list("menu");
    db.list("menu", ref => ref.orderByChild('category')).snapshotChanges().subscribe(items => {
      this.menu = items;
    });
  }

  ngOnInit(): void {
  }

  addDish() {
    this.formService.setDish(null);
  }

  editDish(snap: any) {
    this.formService.setDish(snap);
  }

  deleteDish(key: any) {
    this.menuRef.remove(key);
  }

  disableDish(dish: any) {
    this.menuRef.update(dish.key, { 'status': 0 })
  }

}
