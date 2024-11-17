import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileDashboardComponent } from './mobile-dashboard.component';
import { MobileDashboardRoutingModule } from './mobile-dashboard.routing';
import { MenuMobileComponent } from './menu/menu.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzNotificationModule } from 'ng-zorro-antd/notification';


@NgModule({
  declarations: [
    MobileDashboardComponent,
    MenuMobileComponent
  ],
  imports: [
    CommonModule,
    MobileDashboardRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzDropDownModule,
    NzNotificationModule
  ]
})
export class MobileDashboardModule { }
