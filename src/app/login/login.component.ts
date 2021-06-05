import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  userData: any;

  constructor(private authService: AuthService) {
    this.authService.updateUserData$.subscribe(x => {
      this.userData = this.authService.userData;
    })
    if (!this.userData) {
      this.userData = this.authService.userData;
    }
  }

  login() {
    this.authService.login(this.username, this.password);
  }

  logout() {
    this.authService.logout();
  }

}
