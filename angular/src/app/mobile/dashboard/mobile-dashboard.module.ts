import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileDashboardComponent } from './mobile-dashboard.component';
import { MobileDashboardRoutingModule } from './mobile-dashboard.routing';



@NgModule({
  declarations: [
    MobileDashboardComponent
  ],
  imports: [
    CommonModule,
    MobileDashboardRoutingModule
  ]
})
export class MobileDashboardModule { }
