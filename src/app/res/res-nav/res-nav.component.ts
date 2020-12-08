import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BillingService } from '../billing.service';

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

  constructor(private breakpointObserver: BreakpointObserver) {}

}
