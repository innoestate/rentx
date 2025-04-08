import { Component, input, model } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ui-pagination',
  imports: [NzIconModule],
  templateUrl: './ui-pagination.component.html',
  styleUrl: './ui-pagination.component.scss'
})
export class UiPaginationComponent {

  pageIndex = model<number>();
  total = input.required<number>();

  next(){
    this.pageIndex.set(Math.min(this.total(), (this.pageIndex()??1) + 1));
  }

  prev(){
    this.pageIndex.set(Math.max(1, (this.pageIndex()??0) - 1));
  }
}
