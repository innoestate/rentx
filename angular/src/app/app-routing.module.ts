import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceGuard } from './core/guards/device.guard';
import { CallbackComponent } from './displays/pages/callback/callback.component';
import { HomeComponent } from './displays/pages/home/home.component';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  {
    path: '',
    canActivate: [DeviceGuard],
    children: [
      {
        path: 'mobile',
        loadChildren: () => import('./displays/mobile/mobile.module').then(m => m.MobileModule),
      },
      {
        path: 'desktop',
        loadChildren: () => import('./displays/desktop/desktop.module').then(m => m.DesktopModule),
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'cdu',
        loadChildren: () => import('./displays/pages/cdu/cdu.module').then(m => m.CduModule)
      },
      {
        path: 'policies',
        loadChildren: () => import('./displays/pages/policies/policies.module').then(m => m.PoliciesModule)
      },
      {
        path: 'welcom',
        loadChildren: () => import('./displays/pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      { path: '', redirectTo: '/me', pathMatch: 'full' }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
