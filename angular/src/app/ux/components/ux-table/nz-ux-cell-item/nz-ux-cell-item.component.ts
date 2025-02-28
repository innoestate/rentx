import { Component, computed, ElementRef, input } from '@angular/core';
import { CellType } from '../types/ux-table.cell.type';
import { UxItem } from 'src/app/ux/models/ux-item.model';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-ux-cell-item',
  imports: [NzIconModule],
  standalone: true,
  templateUrl: './nz-ux-cell-item.component.html',
  styleUrl: './nz-ux-cell-item.component.scss'
})
export class NzUxCellItemComponent {

  item = input.required<CellType>();
  insideItem = computed(() => this.item() as UxItem);

  constructor(elRef: ElementRef) {
    elRef.nativeElement.addEventListener('click', () => {
      const insideItem = this.insideItem();
      if (insideItem?.command) {
        insideItem?.command();
      }
    })
  }

  clickOnItem() {
    this.insideItem()?.command?.();
  }

}
