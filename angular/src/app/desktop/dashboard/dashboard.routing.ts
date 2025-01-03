import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDesktopComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardDesktopComponent, children: [
      {
        path: 'estates',
        loadChildren: () => import('./pages/estates/estates.module').then(m => m.EstatesModule),
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
export class DashboardRoutingModule { }
