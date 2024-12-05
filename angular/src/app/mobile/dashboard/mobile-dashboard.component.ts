import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardComponent } from '../../common/dashboard.component';

@Component({
  selector: 'app-mobile-dashboard',
  templateUrl: './mobile-dashboard.component.html',
  styleUrl: './mobile-dashboard.component.scss'
})
export class MobileDashboardComponent extends DashboardComponent implements AfterViewInit {

  @ViewChild('layout') layout!: ElementRef;

  ngAfterViewInit() {
    console.log('layout', this.layout);
    this.layout.nativeElement.style.height =  window.innerHeight + 'px';
  }
}
