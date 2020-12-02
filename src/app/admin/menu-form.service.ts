import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MenuFormService {

  dishKey!: string;
  menuPath = "menu";
  menuList!: any[];
  menuRef!: AngularFireList<any>;
  dish!: any;

  constructor(db: AngularFireDatabase) { 
    this.menuRef = db.list(this.menuPath);
    db.list(this.menuPath).snapshotChanges()
      .subscribe(tables => {
        this.menuList = tables;
      });
  }

  setKey(key: string) {
    this.dishKey = key;
  }

  setDish(dish: any) {
    this.dish = dish;
  }

  addDish(name: string, price: number) {
    this.menuRef.push({'name': name, 'price': price, 'status': 0});
  }

  editDish(key: string, name: string, price: number) {
    this.menuRef.update(key, {'name': name, 'price': price});
  }
  
}
