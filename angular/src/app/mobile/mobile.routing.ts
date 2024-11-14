import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CallbackComponent } from '../callback/callback.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'me',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/mobile-dashboard.module').then(m => m.MobileDashboardModule),
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'dashboard', pathMatch: 'full'
      },
    ]
  },
  { path: '', redirectTo: '/me', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
