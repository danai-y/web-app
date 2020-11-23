import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CusNavService } from '../services/cus-nav.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cus-nav',
  templateUrl: './cus-nav.component.html',
  styleUrls: ['./cus-nav.component.css'],
  providers: [CusNavService],
})
export class CusNavComponent implements OnInit {
<<<<<<< HEAD

  tableId!: number;
=======
>>>>>>> ae38e9a344a48a8af7820db057b6c2252caf25a4

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private cusNavService: CusNavService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
<<<<<<< HEAD
      this.tableId = Number(params.get('tableId'));
    });
    this.cusNavService.setTableId(this.tableId);
=======
      this.cusNavService.setTableId(Number(params.get('tableId')));
    });
>>>>>>> ae38e9a344a48a8af7820db057b6c2252caf25a4
  }

}
