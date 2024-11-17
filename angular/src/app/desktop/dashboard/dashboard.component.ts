import { Component } from '@angular/core';
import { DashboardComponent } from '../../common/dashboard.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardDesktopComponent extends DashboardComponent {}
