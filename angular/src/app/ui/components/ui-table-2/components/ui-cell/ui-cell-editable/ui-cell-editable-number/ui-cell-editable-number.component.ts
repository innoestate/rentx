import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, signal } from '@angular/core';
import { UiIconComponent } from 'src/app/ui/components/ui-icon/ui-icon.component';
import { UiLabel2Component } from '../../../ui-label/ui-label.component';
import { UiCellEditableComponent } from '../ui-cell-editable.component';
import { UiIcon2Component } from 'src/app/ui/components/ui-icon/ui-icon2.component';

@Component({
  selector: 'app-ui-cell-editable-number',
  imports: [CommonModule, UiLabel2Component, UiIcon2Component],
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

