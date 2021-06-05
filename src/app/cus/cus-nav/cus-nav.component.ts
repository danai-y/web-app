import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CusNavService } from '../cus-nav.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cus-nav',
  templateUrl: './cus-nav.component.html',
  styleUrls: ['./cus-nav.component.css'],
  providers: [CusNavService],
})
export class CusNavComponent implements OnInit {

  tableId!: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private cusNavService: CusNavService,
    private router: Router
  ) {
    this.cusNavService.activateWildCard$.subscribe(x => {
      if (x) {
        this.router.navigate(['**']);
      }
    });
    this.cusNavService.noTable$.subscribe(noTable => {
      if (this.tableId <= 0 || this.tableId > noTable) {
        this.cusNavService.activateWildCard$.next(true);
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tableId = +params.get('tableId')!;
      if (isNaN(this.tableId)) {
        this.cusNavService.activateWildCard$.next(true);
      } else {
        this.cusNavService.setTableId(this.tableId);
      }
    });
  }

}
