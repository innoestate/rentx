import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceGuard } from './core/guards/device.guard';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  {
    path: '',
    canActivate: [DeviceGuard],
    children: [
      {
        path: 'mobile',
        loadChildren: () => import('./mobile/mobile.module').then(m => m.MobileModule),
      },
      {
        path: 'desktop',
        loadChildren: () => import('./desktop/desktop.module').then(m => m.DesktopModule),
      },
      {
        path: 'cdu',
        loadChildren: () => import('./common/pages/cdu/cdu.module').then(m => m.CduModule)
      },
      {
        path: 'policies',
        loadChildren: () => import('./common/pages/policies/policies.module').then(m => m.PoliciesModule)
      },
      { path: '', redirectTo: '/me', pathMatch: 'full' }
    ]
  },
  {
    path: '**',
    redirectTo: 'desktop/login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
