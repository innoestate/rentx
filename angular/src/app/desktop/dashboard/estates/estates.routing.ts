import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopEstatesComponent } from './estates.component';
import { DesktopEstatesHandlerComponent } from './estates-handler/estates-handler.component';

const routes: Routes = [
  {
    path: '', component: DesktopEstatesComponent, children: [
      {
        path: 'handler', component: DesktopEstatesHandlerComponent, children: [
          { path: 'estates-table', loadChildren: () => import('./estates-handler/estates-table/estates-table.module').then(m => m.EstatesTableModule) },
          { path: 'owners-table', loadChildren: () => import('./estates-handler/owners-table/desktop-owners-table.module').then(m => m.DesktopOwnersTableModule) },
          { path: 'lodgers-table', loadChildren: () => import('./estates-handler/lodgers-table/lodgers-table.module').then(m => m.DesktopLodgersTableModule) },
          { path: '', redirectTo: 'estates-table', pathMatch: 'full' }
        ]
      },
      { path: '', redirectTo: 'handler', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstatesDesktopRoutingModule { }
