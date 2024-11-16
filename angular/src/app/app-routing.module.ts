import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { DeviceGuard } from './core/guards/device.guard';

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
