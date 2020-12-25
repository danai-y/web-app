import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BillingService } from '../billing.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-res-nav',
  templateUrl: './res-nav.component.html',
  styleUrls: ['./res-nav.component.css'],
  providers: [BillingService],
})
export class ResNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  hiddenBadge: boolean = true;
  user: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private db: AngularFireDatabase,
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = authService.userData;
    this.db.list("tables").snapshotChanges().subscribe(tables => {
      let count: number = 0;
      tables.forEach(table => {
        let value: any = table.payload.val();
        if (value.status == 3) {
          count++;
        }
      });
      if (count > 0) {
        this.hiddenBadge = false;
      } else {
        this.hiddenBadge = true;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
