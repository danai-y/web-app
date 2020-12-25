import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard#canActivate called');
    this.authService.redirectUrl = state.url;
    const userData = this.authService.userData;
    if (userData) {
      if (route.data.roles && route.data.roles.indexOf(userData.role) === -1) {
        return this.router.parseUrl('/login');
      } else { return true; }
    }
    return this.router.parseUrl('/login');
  }

}
