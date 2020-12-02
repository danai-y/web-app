import { Component, OnInit } from '@angular/core';
import { MenuFormService } from '../menu-form.service';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {

  dishName!: string;
  price!: number;
  dishKey!: string;

  constructor(public menuFormService: MenuFormService) {
    this.dishKey = menuFormService.dishKey;
    if (this.dishKey != '0') {
      this.dishName = menuFormService.dish.name;
      this.price = menuFormService.dish.price;
    }
  }

  ngOnInit(): void {
  }

  saveDish() {
    if (this.dishKey == '0') {
      this.menuFormService.addDish(this.dishName, this.price);
    } else {
      console.log(this.dishName);
      this.menuFormService.editDish(this.dishKey, this.dishName, this.price);
    }
  }

}
