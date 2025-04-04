import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDesktopComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'draft', component: DashboardDesktopComponent, children: [
      {
        path: 'properties',
        loadChildren: () => import('./properties/properties.module').then(m => m.DesktopPropertiesModule),
      },
      {
        path: 'prospections',
        loadChildren: () => import('./prospections/prospections.module').then(m => m.ProspectionsModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'own'
      },
      {
        path: '**',
        redirectTo: 'properties'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
