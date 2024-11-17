import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDesktopComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { MenuDesktopComponent } from './menu/menu.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [
    DashboardDesktopComponent,
    MenuDesktopComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzDropDownModule,
    NzNotificationModule
  ]
})
export class DashboardModule { }
