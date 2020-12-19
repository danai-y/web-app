import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CategoryFormService } from '../category-form.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  categoriesPath = "categories";
  categories!: any[];
  categoriesRef!: AngularFireList<any>;

  constructor(db: AngularFireDatabase,private categoryFormService: CategoryFormService) {
    this.categoriesRef = db.list(this.categoriesPath);
    db.list(this.categoriesPath).snapshotChanges()
      .subscribe(cats => {
        this.categories = cats;
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
  }

  editCategory(cat: any) {
    this.categoryFormService.setCategory(cat);
  }

}
