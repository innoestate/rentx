import { Component, computed, ElementRef, input } from '@angular/core';
import { CellType } from '../types/ui-table.cell.type';
import { UiItem } from 'src/app/ui/models/ui-item.model';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-ui-cell-item',
  imports: [NzIconModule],
  standalone: true,
  templateUrl: './nz-ui-cell-item.component.html',
  styleUrl: './nz-ui-cell-item.component.scss'
})
export class NzUxCellItemComponent {

  item = input.required<CellType>();
  insideItem = computed(() => this.item() as UiItem);

  constructor(private elRef: ElementRef) {
    this.activeCommandOnClick();
  }

  private activeCommandOnClick(){
    this.elRef.nativeElement.addEventListener('click', () => {
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
