import { Component, OnInit } from '@angular/core';
import { EstatePage } from 'src/app/common/pages/estates.page.component';

@Component({
    selector: 'app-estates',
    templateUrl: './estates.component.html',
    styleUrl: './estates.component.scss',
    standalone: false
})
export class EstatesPageDesktopComponent extends EstatePage implements OnInit {

  pageSize: number = 8;

  override ngOnInit() {
    this.calculatePageSize();
    super.ngOnInit();
  }

  calculatePageSize() {
    const totalHeight = window.innerHeight - 250;
    const rowHeight = 64;
    this.pageSize = Math.floor(totalHeight / rowHeight) ;
  }

}
