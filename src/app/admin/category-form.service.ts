import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryFormService {

  category!: any;

  constructor() { }

  setCategory(cat: any) {
    this.category = cat;
  }
}
