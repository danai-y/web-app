import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CusNavComponent } from './cus/cus-nav/cus-nav.component';
import { LoginComponent } from './login/login.component';
import { MenuListComponent } from './res/menu-list/menu-list.component';
import { MenuComponent } from './cus/menu/menu.component';
import { OrderListComponent } from './res/order-list/order-list.component';
import { OrderComponent } from './cus/order/order.component';
import { ResNavComponent } from './res/res-nav/res-nav.component';
import { TableListComponent } from './res/table-list/table-list.component';
import { EditTableComponent } from './admin/edit-table/edit-table.component';
import { EditMenuComponent } from './admin/edit-menu/edit-menu.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { MenuFormComponent } from './admin/form-menu/menu-form.component';
import { BillingComponent } from './res/billing/billing.component';
import { ReportComponent } from './res/report/report.component';
import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { CategoryFormComponent } from './admin/form-category/category-form.component';
import { AuthGuard } from './auth/auth.guard';
import { EditStaffComponent } from './admin/edit-staff/edit-staff.component';
import { FormStaffComponent } from './admin/form-staff/form-staff.component';

const routes: Routes = [
  { path: '', redirectTo: 'manage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminNavComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', component: EditTableComponent },
      { path: 'edit-menu', component: EditMenuComponent },
      { path: 'edit-category', component: EditCategoryComponent },
      { path: 'edit-staff', component: EditStaffComponent },
      { path: 'menu-form', component: MenuFormComponent },
      { path: 'category-form', component: CategoryFormComponent },
      { path: 'form-staff', component: FormStaffComponent },
    ]
  },
  {
    path: 'manage',
    component: ResNavComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'staff'] },
    children: [
      { path: '', component: TableListComponent },
      { path: 'order-list', component: OrderListComponent },
      { path: 'menu-list', component: MenuListComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'report', component: ReportComponent },
    ]
  },
  {
    path: 'table/:tableId',
    component: CusNavComponent,
    children: [
      { path: '', component: MenuComponent },
      { path: 'order', component: OrderComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
