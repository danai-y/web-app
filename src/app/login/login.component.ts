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

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
    setTimeout(() => {
      if (this.authService.userData) {
        console.log('get user data')
        if (authService.redirectUrl) {
          this.router.navigate([authService.redirectUrl]);
        }
      }
    }, 2000);
  }

  login() {
    this.authService.login(this.username, this.password);
  }

}
