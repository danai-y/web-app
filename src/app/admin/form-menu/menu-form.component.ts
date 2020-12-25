import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['../form.style.css']
})
export class MenuFormComponent implements OnInit {

  dishKey!: string;
  categories!: any;
  menuRef!: AngularFireList<any>;
  uploadPercent!: Observable<number | undefined>;

  dishName!: string;
  price!: number;
  category!: number;
  imageUrl!: string;
  recommended: boolean = false;

  constructor(
    private formService: FormService,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase
  ) {
    this.menuRef = db.list("menu");
    this.getCategoryList();
    if (this.formService.dishSnap) {
      this.dishKey = formService.dishSnap.key;
      this.getExistingData();
    }
  }

  ngOnInit(): void {
  }

  saveDish() {
    let duplicatedName = false;
    if (this.formService.dishSnap) {
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
        'category': Number(this.category),
        'recommended': (this.recommended == true) ? 1 : 0,
        'image': this.imageUrl
      });
    } else {
      this.menuRef.update(this.dishKey, {
        'name': this.dishName,
        'price': Number(this.price),
        'category': Number(this.category),
        'recommended': (this.recommended == true) ? 1 : 0,
        'image': this.imageUrl
      });
    }
  }

  selectFile(event: any) {
    const file = event.target.files[0];
    const filePath = 'menu-image/' + this.dishKey;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.percentageChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(url => {
        this.imageUrl = url;
      }))
    ).subscribe(console.log)
  }

  getExistingData() {
    let dish = this.formService.dishSnap.payload.val()
    this.dishName = dish.name;
    this.price = dish.price;
    this.category = dish.category;
    this.imageUrl = dish.image;
    this.recommended = (dish.recommended == 1) ? true : false;
  }

  getCategoryList() {
    this.db.list("categories").valueChanges().subscribe(items => {
      this.categories = items;
    })
  }

}
