import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { DeviceGuard } from './core/guards/Device.guard';

const routes: Routes = [

  // { path: 'login', component: LoginComponent },
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
      // {
      //   path: 'me',
      //   canActivate: [AuthGuard],
      //   children: [
      //     {
      //       path: 'dashboard',
      //       loadChildren: () => import('./desktop/dashboard/dashboard.module').then(m => m.DashboardModule),
      //       pathMatch: 'full'
      //     },
      //     {
      //       path: '**',
      //       redirectTo: 'dashboard', pathMatch: 'full'
      //     },
      //   ]
      // },
      { path: '', redirectTo: '/me', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    redirectTo: '/mobile/login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
