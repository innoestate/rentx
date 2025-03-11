import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceGuard } from './core/guards/device.guard';
import { CallbackComponent } from './views/common/pages/callback/callback.component';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  {
    path: '',
    canActivate: [DeviceGuard],
    children: [
      {
        path: 'mobile',
        loadChildren: () => import('./views/mobile/mobile.module').then(m => m.MobileModule),
      },
      {
        path: 'desktop',
        loadChildren: () => import('./views/desktop/desktop.module').then(m => m.DesktopModule),
      },
      {
        path: 'cdu',
        loadChildren: () => import('./views/common/pages/cdu/cdu.module').then(m => m.CduModule)
      },
      {
        path: 'policies',
        loadChildren: () => import('./views/common/pages/policies/policies.module').then(m => m.PoliciesModule)
      },
      {
        path: 'welcom',
        loadChildren: () => import('./views/common/pages/welcome/welcome.module').then(m => m.WelcomeModule)
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
