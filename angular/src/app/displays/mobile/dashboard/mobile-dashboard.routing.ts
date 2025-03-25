import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileDashboardComponent } from './mobile-dashboard.component';

const routes: Routes = [
  {
    path: '', component: MobileDashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileDashboardRoutingModule { }
