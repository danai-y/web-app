import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResNavComponent } from './res/res-nav/res-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CusNavComponent } from './cus/cus-nav/cus-nav.component';
import { TableListComponent } from './res/table-list/table-list.component';
import { OrderListComponent } from './res/order-list/order-list.component';
import { MenuComponent, AddOrderDialog } from './cus/menu/menu.component';
import { OrderComponent } from './cus/order/order.component';
import { MatCardModule } from '@angular/material/card';
import { MenuListComponent } from './res/menu-list/menu-list.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { EditTableComponent } from './admin/edit-table/edit-table.component';
import { EditMenuComponent } from './admin/edit-menu/edit-menu.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuFormComponent } from './admin/menu-form/menu-form.component';
import { BillingComponent } from './res/billing/billing.component';
import { ReportComponent } from './res/report/report.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    ResNavComponent,
    CusNavComponent,
    TableListComponent,
    OrderListComponent,
    MenuComponent,
    OrderComponent,
    MenuListComponent,
    LoginComponent,
    EditTableComponent,
    EditMenuComponent,
    AdminNavComponent,
    MenuFormComponent,
    BillingComponent,
    ReportComponent,
    AddOrderDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    AngularFireAuthModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
