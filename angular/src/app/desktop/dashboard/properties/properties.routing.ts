import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopEstatesHandlerComponent } from './properties.component';

const routes: Routes = [
  {
    path: '', component: DesktopEstatesHandlerComponent, children: [
      { path: 'estates-table', loadChildren: () => import('./estates-table/estates-table.module').then(m => m.EstatesTableModule) },
      { path: 'owners-table', loadChildren: () => import('./owners-table/desktop-owners-table.module').then(m => m.DesktopOwnersTableModule) },
      { path: 'lodgers-table', loadChildren: () => import('./lodgers-table/lodgers-table.module').then(m => m.DesktopLodgersTableModule) },
      { path: '', redirectTo: 'lodgers-table', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesktopEstatesHandlerRoutingModule { }
