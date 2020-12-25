import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public categorySnap!: any;
  public dishSnap!: any;
  public staffSnapOrKey!: any;

  constructor() { }

  setCategory(snap: any) {
    this.categorySnap = snap;
  }

  setDish(snap: any) {
    this.dishSnap = snap;
  }

  setStaff(snapOrKey: any) {
    this.staffSnapOrKey = snapOrKey;
  }

}
