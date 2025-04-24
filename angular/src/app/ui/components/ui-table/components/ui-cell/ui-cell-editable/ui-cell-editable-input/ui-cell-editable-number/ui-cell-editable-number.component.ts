import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, signal } from '@angular/core';
import { UiInputComponent } from 'src/app/ui/components/ui-input/ui-input.component';
import { UiLabel2Component } from '../../../../ui-label/ui-label.component';
import { UiCellEditableInputComponent } from '../ui-cell-editable-input.component';

@Component({
  selector: 'app-ui-cell-editable-number',
  imports: [CommonModule, UiLabel2Component, UiInputComponent],
  templateUrl: './ui-cell-editable-number.component.html',
  styleUrl: './ui-cell-editable-number.component.scss'
})
export class UiCellEditableNumberComponent extends UiCellEditableInputComponent implements AfterViewInit {

  protected inputWidth = signal(60);

  ngAfterViewInit(): void {
    setTimeout(() => {
      const contentElement = this.el.nativeElement.querySelector('.ui-label-content') as HTMLDivElement;
      this.inputWidth.set(contentElement.offsetWidth);
    }, 0);
  }

}

