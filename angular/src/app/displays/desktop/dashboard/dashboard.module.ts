import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { DashboardDesktopComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { MenuDesktopComponent } from './menu/menu.component';

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
