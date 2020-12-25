import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormService } from '../form.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['../form.style.css']
})
export class CategoryFormComponent implements OnInit {

  category!: any;
  categoriesRef!: AngularFireList<any>;
  categoryName!: string;

  constructor(
    private formService: FormService,
    private db: AngularFireDatabase
  ) {
    this.categoriesRef = this.db.list('categories');
    this.category = this.formService.categorySnap;
    this.categoryName = this.category.payload.val().name;
  }

  ngOnInit(): void {
  }

  saveCategory() {
    this.categoriesRef.update(this.category.key, { 'name': this.categoryName });
  }

}
