import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResNavComponent } from './res-nav/res-nav.component';

const routes: Routes = [
  { path: '', component: ResNavComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
