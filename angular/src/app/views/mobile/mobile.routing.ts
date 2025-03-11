import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginMobileGuard } from './guards/login.mobile.guard';
import { AuthMobileGuard } from './guards/auth.mobile.guard';
import { LoginComponent } from '../common/pages/login/login.component';

const routes: Routes = [
  { path: 'login', canActivate: [LoginMobileGuard], component: LoginComponent },
  {
    path: 'me',
    canActivate: [AuthMobileGuard],
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
  { path: '**', redirectTo: '/me', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
