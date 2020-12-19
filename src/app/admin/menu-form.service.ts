import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuFormService {

  dishKey!: string;
  dish!: any;

  constructor() { }

  setKey(key: string) {
    this.dishKey = key;
  }

  setDish(dish: any) {
    this.dish = dish;
  }

}
