import { AfterViewInit, Component, computed, ElementRef, input } from '@angular/core';
import { CellType } from '../types/ui-table.cell.type';
import { UiItem } from 'src/app/ui/models/ui-item.model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UiIconComponent } from '../../ui-icon/ui-icon.component';
import { UiLabelComponent } from '../../ui-label/ui-label.component';

@Component({
  selector: 'nz-ui-cell-item',
  imports: [NzIconModule, UiLabelComponent, UiIconComponent],
  standalone: true,
  templateUrl: './nz-ui-cell-item.component.html',
  styleUrl: './nz-ui-cell-item.component.scss'
})
export class NzUxCellItemComponent implements AfterViewInit {

  item = input.required<CellType>();
  insideItem = computed(() => {
    const item = this.item() as UiItem;
    return {
      ...item,
      icon: item.icon,
      label: item.label,
      color: item.color ?? 'var(--color-secondary-500)',
      size: item.iconSize ?? 14
    }
  });

  constructor(private elRef: ElementRef) {
    this.activeCommandOnClick();
  }

  ngAfterViewInit(): void {
    this.elRef.nativeElement.style.color = this.insideItem()?.color;
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
