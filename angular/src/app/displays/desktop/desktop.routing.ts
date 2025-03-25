import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthDesktopGuard } from './guards/auth.desktop.guard';
import { LoginDesktopGuard } from './guards/login.desktop.guard';
import { LoginComponent } from '../pages/login/login.component';

const routes: Routes = [
  { path: 'login', canActivate: [LoginDesktopGuard], component: LoginComponent },
  {
    path: 'me',
    canActivate: [AuthDesktopGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: '**',
        redirectTo: 'dashboard'
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
