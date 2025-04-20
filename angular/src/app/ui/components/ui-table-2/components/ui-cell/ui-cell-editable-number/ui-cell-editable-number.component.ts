import { AfterViewInit, Component, effect, ElementRef, input, signal } from '@angular/core';
import { UiCellComponent } from '../ui-cell.component';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UiLabelComponent } from '../../ui-label/ui-label.component';
import { UiIconComponent } from 'src/app/ui/components/ui-icon/ui-icon.component';
import { isEqual } from 'lodash';
import { UiCellEditableComponent } from '../ui-cell-editable/ui-cell-editable.component';

@Component({
  selector: 'app-ui-cell-editable-number',
  imports: [CommonModule, UiLabelComponent, UiIconComponent],
  templateUrl: './ui-cell-editable-number.component.html',
  styleUrl: './ui-cell-editable-number.component.scss'
})
export class UiCellEditableNumberComponent extends UiCellEditableComponent implements AfterViewInit {

  protected inputWidth = signal(60);

  ngAfterViewInit(): void {
    setTimeout(() => {
      const contentElement = this.el.nativeElement.querySelector('.ui-label-content') as HTMLDivElement;
      this.inputWidth.set(contentElement.offsetWidth);
    }, 0);
  }

}

