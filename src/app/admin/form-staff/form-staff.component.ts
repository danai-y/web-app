import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/auth/auth.service';
import { FormService } from '../form.service';

@Component({
  selector: 'app-form-staff',
  templateUrl: './form-staff.component.html',
  styleUrls: ['../form.style.css']
})
export class FormStaffComponent implements OnInit {

  snapOrKey: any;
  staffRef: any;
  action!: string;

  staffName!: string;
  email!: string;
  password!: string;

  constructor(
    private formService: FormService,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.staffRef = this.db.list('user');
    this.snapOrKey = this.formService.staffSnapOrKey;
    if (this.snapOrKey && typeof this.snapOrKey !== 'string') {
      this.action = "edit";
      this.staffName = this.snapOrKey.payload.val().name;
    } else if (!this.snapOrKey) {
      this.action = "add";
    } else {
      this.action = "delete";
    }
  }

  ngOnInit(): void {
  }

  addNewStaff() {
    this.authService.signUp(this.staffName, this.email, this.password);
  }

  deleteStaff() {
    this.authService.delete(this.snapOrKey, this.email, this.password);
  }

}
