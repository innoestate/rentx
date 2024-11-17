import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileDashboardComponent } from './mobile-dashboard.component';

const routes: Routes = [
  {
    path: '', component: MobileDashboardComponent, children: [
      {
        path: 'estates',
        loadChildren: () => import('./pages/estates-page/estates-page.module').then(m => m.EstatesPageModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'estates'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileDashboardRoutingModule { }
