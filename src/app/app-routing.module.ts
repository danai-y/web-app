import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CusNavComponent } from './cus-nav/cus-nav.component';
import { MenuComponent } from './menu/menu.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderComponent } from './order/order.component';
import { ResNavComponent } from './res-nav/res-nav.component';
import { TableListComponent } from './table-list/table-list.component';

const routes: Routes = [
  {
    path: 'manage',
    component: ResNavComponent,
    children: [
      {
        path: '',
        component: TableListComponent
      },
      {
        path: 'order-list',
        component: OrderListComponent
      }
    ]
  },
  {
    path: 'table/:tableId',
    component: CusNavComponent,
    children: [
      {
        path: '',
        component: MenuComponent
      },
      {
        path: 'order',
        component: OrderComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
