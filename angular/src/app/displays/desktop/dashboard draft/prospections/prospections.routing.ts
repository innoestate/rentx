import { RouterModule, Routes } from '@angular/router';
import { DesktopProspectionsComponent } from './prospections.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', component: DesktopProspectionsComponent, children: [
      { path: 'main', loadChildren: () => import('./prospections-table/desktop-prospections-table.module').then(m => m.DesktopProspectionsTableModule) },
      { path: 'sellers', loadChildren: () => import('./sellers-table/desktop-sellers-table.module').then(m => m.DesktopSellersTableModule) },
      { path: '**', redirectTo: 'main' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProspectionsDesktopRoutingModule { }
