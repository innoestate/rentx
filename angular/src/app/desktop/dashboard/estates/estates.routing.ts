import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopEstatesComponent } from './estates.component';

const routes: Routes = [
  { path: '', component: DesktopEstatesComponent, children: [
    { path: 'list', loadChildren: () => import('./list/estates-list.module').then(m => m.EstatesListModule) },
    // { path: 'owners', loadChildren: () => import('./owners-table/owners-table.module').then(m => m.OwnersTableModule) },
    { path: '', redirectTo: 'list', pathMatch: 'full' }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstatesDesktopRoutingModule { }
