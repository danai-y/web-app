import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CusNavComponent } from './cus-nav/cus-nav.component';
import { ResNavComponent } from './res-nav/res-nav.component';

const routes: Routes = [
  { path: '', component: ResNavComponent },
  { path: 'table', component: CusNavComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
