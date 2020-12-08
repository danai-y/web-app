import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  date = new FormControl(new Date());
  trans!: any[];
  total: number = 0;
  displayedColumns: string[] = ['time', 'table', 'total'];
  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
  }

  getTrans() {
    this.db.list("transactions", ref => ref.orderByChild("date").equalTo(this.getSelectedDate()))
    .valueChanges().subscribe(trans => {
      this.trans = trans;
      this.getTotal();
    })
  }

  getSelectedDate() {
    let dd = this.date.value.getDate();
    let mm = Number(this.date.value.getMonth()) + 1;
    let yy = this.date.value.getFullYear();
    return dd + "." + mm + "." + yy;
  }

  getTotal() {
    this.total = 0;
    this.trans.forEach(tran => {
      this.total += tran.total;
    });
  }

}
