import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: any[] | undefined;
  constructor(db: AngularFireDatabase) {
    db.list('menu').valueChanges()
    .subscribe(menu => {
      this.menu = menu;
    });
  }
  ngOnInit(): void {
  }

}
