import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormService } from '../form.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['../edit.style.css']
})
export class EditCategoryComponent implements OnInit {

  categories!: any[];
  categoriesRef!: AngularFireList<any>;

  constructor(
    private db: AngularFireDatabase,
    private formService: FormService
  ) {
    this.categoriesRef = this.db.list('categories');
    this.categoriesRef.snapshotChanges().subscribe(items => {
      this.categories = items;
    });
  }

  ngOnInit(): void {
  }

  addCategory() {
    var id = this.categories.length + 1;
    this.categoriesRef.push({ 'id': id, 'name': 'Category ' + id });
  }

  deleteCategory() {
    var lastKey = this.categories[this.categories.length - 1].key;
    this.categoriesRef.remove(lastKey);
    let menuRef = this.db.list("menu", ref => ref.orderByChild('category').equalTo(this.categories.length)).snapshotChanges().subscribe(items => {
      items.forEach(item => {
        this.db.list('menu').update(item.key!, {'category': 0, 'status': 0});
      })
      menuRef.unsubscribe();
    })
  }

  editCategory(category: any) {
    this.formService.setCategory(category);
  }

}
