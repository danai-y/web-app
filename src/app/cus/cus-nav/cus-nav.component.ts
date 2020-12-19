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
  tableId$ = new Subject<number>();

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
    this.tableId$.subscribe(id => {
      this.cusNavService.noTable$.subscribe(noTable => {
        if (id <= 0 || id > noTable) {
          this.router.navigate(['**']);
        }
      });
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tableId = +params.get('tableId')!;
    });
    if (isNaN(this.tableId)) {
      this.router.navigate(['**']);
      return;
    }
    this.tableId$.next(this.tableId);
    this.cusNavService.setTableId(this.tableId);
  }

}
