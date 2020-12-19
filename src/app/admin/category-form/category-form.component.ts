import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CategoryFormService } from '../category-form.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoriesPath = "categories";
  category!: any;
  categoriesRef!: AngularFireList<any>;
  categoryName!: string;

  constructor(private categoryFormService: CategoryFormService, db: AngularFireDatabase) {
    this.categoriesRef = db.list(this.categoriesPath);
    this.category = categoryFormService.category;
    this.categoryName = this.category.payload.val().name;
  }

  ngOnInit(): void {
  }

  saveCategory() {
    this.categoriesRef.update(this.category.key, { 'name': this.categoryName });
  }

}
