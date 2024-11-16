import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LoginDesktopGuard } from '../core/guards/Login.desktop.guard';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  { path: 'login', canActivate: [LoginDesktopGuard], component: LoginComponent },
  {
    path: 'me',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'dashboard', pathMatch: 'full'
      },
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesktopRoutingModule { }