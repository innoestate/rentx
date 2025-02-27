import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDesktopComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardDesktopComponent, children: [
      {
        path: 'estates',
        loadChildren: () => import('./estates/estates.module').then(m => m.EstatesModule),
      },
      {
        path: 'prospections',
        loadChildren: () => import('./pages/prospections/prospections.module').then(m => m.ProspectionsModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'own'
      },
      {
        path: '**',
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
