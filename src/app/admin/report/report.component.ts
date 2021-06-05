import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  date = new FormControl(new Date());
  trans!: any[];
  total: number = -1;
  displayedColumns!: string[];
  type!: string;
  doneRetrivedDaily$ = new Subject<boolean>();
  doneRetrivedMonthly$ = new Subject<boolean>();
  display$!: Observable<boolean>;

  dataList!: any[];
  countingListKeys!: string[];
  countingList: any;

  constructor(private db: AngularFireDatabase) {
    this.doneRetrivedDaily$.subscribe(x => {
      if (x) {
        this.dataList = [];
        this.countingListKeys.forEach(key => {
          this.dataList.push(this.countingList[key]);
          this.total = this.total + this.countingList[key].total;
        })
        this.display$ = of(true);
      }
    })
    this.doneRetrivedMonthly$.subscribe(x => {
      if (x) {
        this.dataList = [];
        this.countingListKeys.forEach(key => {
          this.dataList.push(this.countingList[key]);
          this.total = this.total + this.countingList[key].total;
        })
        this.display$ = of(true);
      }
    })
  }

  ngOnInit(): void {
  }

  getSelectedDate(dd = this.date.value.getDate()) {
    let mm = Number(this.date.value.getMonth()) + 1;
    let yy = this.date.value.getFullYear();
    return dd + "." + mm + "." + yy;
  }

  getDaily() {
    this.display$ = of(false);
    this.total = 0;
    this.type = "daily";
    this.displayedColumns = ['dish', 'count', 'total'];
    this.countingListKeys = [];
    this.countingList = {};

    this.db.list('transactions', ref => ref.orderByChild('date').equalTo(this.getSelectedDate())).snapshotChanges().subscribe(trans => {
      let noTrans = trans.length;
      if (noTrans == 0) { this.total = -1 }
      trans.forEach(tran => {
        this.db.list('inactive-orders', ref => ref.orderByChild('trans-key').equalTo(tran.key)).valueChanges().subscribe(items => {
          let orders: any[] = items;
          noTrans--;
          orders.forEach(order => {
            if (this.countingList[order.dish]) {
              this.countingList[order.dish].count = this.countingList[order.dish].count + 1;
              this.countingList[order.dish].total = this.countingList[order.dish].total + order.price;
            } else {
              this.countingListKeys.push(order.dish);
              this.countingList[order.dish] = { dish: order.dish, count: 1, total: order.price };
            }
          })
          if (noTrans == 0) {
            this.doneRetrivedDaily$.next(true)
          }
        })
      })
    })
  }

  getMonthly() {
    this.display$ = of(false);
    this.total = 0;
    this.type = "monthly";
    this.displayedColumns = ['date', 'total'];
    this.countingListKeys = [];
    this.countingList = {};

    for (let i = 1; i <= 31; i++) {
      this.db.list('transactions', ref => ref.orderByChild('date').equalTo(this.getSelectedDate(i))).valueChanges().subscribe(items => {
        let trans: any[] = items;
        trans.forEach(tran => {
          if (this.countingList[tran.date]) {
            this.countingList[tran.date].total = this.countingList[tran.date].total + tran.total;
          } else {
            this.countingListKeys.push(tran.date);
            this.countingList[tran.date] = { date: tran.date, total: tran.total };
          }
        })
        if (i == 31) {
          this.doneRetrivedMonthly$.next(true)
        }
      })
    }

  }

}
