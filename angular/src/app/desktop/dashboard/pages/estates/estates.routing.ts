import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstatesPageDesktopComponent } from './estates.component';

const routes: Routes = [
  { path: '', component: EstatesPageDesktopComponent, children: [
    { path: 'estates', loadChildren: () => import('./estates-table/estates-table.module').then(m => m.EstatesTableModule) },
    { path: 'owners', loadChildren: () => import('./owners-table/owners-table.module').then(m => m.OwnersTableModule) }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstatesDesktopRoutingModule { }
