import { Component, input, model, signal } from '@angular/core';
import { UiIcon } from '../ui-icon/models/ui-icon.model';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'ui-pagination',
  imports: [UiIconComponent],
  templateUrl: './ui-pagination.component.html',
  styleUrl: './ui-pagination.component.scss'
})
export class UiPaginationComponent {

  pageIndex = model<number>();
  total = input.required<number>();

  iconLeft = signal<UiIcon>({name: 'left', size: 22, color:"var(--color-primary-500)"})
  iconRight = signal<UiIcon>({name: 'right', size: 22, color:"var(--color-primary-500)"})


  next(){
    this.pageIndex.set(Math.min(this.total(), (this.pageIndex()??1) + 1));
  }

  prev(){
    this.pageIndex.set(Math.max(1, (this.pageIndex()??0) - 1));
  }
}
