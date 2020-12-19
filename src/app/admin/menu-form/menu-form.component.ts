import { Component, OnInit } from '@angular/core';
import { MenuFormService } from '../menu-form.service';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {

  dishName!: string;
  price!: number;
  dishKey!: string;
  imageFile!: File;
  imageUrl!: Observable<string>;
  categories!: any;
  category: number = 0;
  menuRef!: AngularFireList<any>;

  constructor(
    private menuFormService: MenuFormService,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase
  ) {
    this.dishKey = menuFormService.dishKey;
    this.menuRef = db.list("menu");
    this.getCategoryList();
    if (this.dishKey != '0') {
      this.getExistingData();
    }
  }

  ngOnInit(): void {
  }

  saveDish() {
    let menuList;
    let duplicatedName = false;
    if (this.dishKey == '0') {
      this.menuRef.valueChanges().subscribe(items => {
        items.forEach(dish => {
          if (this.dishName == dish.name) {
            duplicatedName = true;
          }
        });
      })
      if (duplicatedName) { return }
      this.menuRef.push({
        'name': this.dishName,
        'price': Number(this.price),
        'status': 0,
        'category': Number(this.category)
      });
    } else {
      this.menuRef.update(this.dishKey, {
        'name': this.dishName,
        'price': Number(this.price),
        'category': Number(this.category)
      });
      this.uploadImage(this.dishKey);
    }
  }

  selectFile(event: any) {
    this.imageFile = event.target.files[0]
  }

  uploadImage(name: string) {
    console.log(this.imageFile)
    if (this.imageFile) {
      this.storage.upload('/menu-image/' + name, this.imageFile);
    }
  }

  getExistingData() {
    this.dishName = this.menuFormService.dish.name;
    this.price = this.menuFormService.dish.price;
    this.category = this.menuFormService.dish.category;
    const ref = this.storage.ref('menu-image/' + this.dishKey);
    this.imageUrl = ref.getDownloadURL();
  }

  getCategoryList() {
    this.db.list("categories").valueChanges().subscribe(items => {
      this.categories = items;
    })
  }

}
