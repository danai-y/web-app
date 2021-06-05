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
  staffPhone!: string;
  email!: string;
  password!: string;

  constructor(
    private formService: FormService,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.staffRef = this.db.list('users');
    this.snapOrKey = this.formService.staffSnapOrKey;
    if (this.snapOrKey && typeof this.snapOrKey !== 'string') {
      this.action = "edit";
      this.staffName = this.snapOrKey.payload.val().name;
      this.staffPhone = this.snapOrKey.payload.val().phone;
    } else if (!this.snapOrKey) {
      this.action = "add";
    } else {
      this.action = "delete";
    }
  }

  ngOnInit(): void {
  }

  addNewStaff() {
    this.authService.signUp(this.staffName, this.staffPhone, this.email, this.password);
  }

  editStaff() {
    this.staffRef.update(this.snapOrKey.key, {
      'name': this.staffName,
      'phone': this.staffPhone,
    })
  }

  deleteStaff() {
    this.authService.delete(this.snapOrKey, this.email, this.password);
  }

}
