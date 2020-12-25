import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormService } from '../form.service';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['../edit.style.css']
})
export class EditStaffComponent implements OnInit {

  staffs: any;
  usersRef: AngularFireList<any>;

  constructor(
    private db: AngularFireDatabase,
    private formService: FormService
  ) {
    this.usersRef = this.db.list('users');
    this.usersRef.snapshotChanges().subscribe(items => {
      this.staffs = items;
    });
  }

  ngOnInit(): void {
  }

  addStaff() {
    this.formService.setStaff(null);
  }

  editStaff(snap: any) {
    this.formService.setStaff(snap);
  }

  deleteStaff(key: string) {
    this.formService.setStaff(key);
  }

}
