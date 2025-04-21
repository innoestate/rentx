import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiIcon2Component } from 'src/app/ui/components/ui-icon/ui-icon2.component';
import { UiLabel2Component } from '../../../ui-label/ui-label.component';
import { UiCellEditableComponent } from '../ui-cell-editable.component';
import { UiInputComponent } from 'src/app/ui/components/ui-input/ui-input.component';

@Component({
  selector: 'ui-cell-editable-string',
  imports: [CommonModule, UiLabel2Component, UiInputComponent],
  templateUrl: './ui-cell-editable-string.component.html',
  styleUrl: './ui-cell-editable-string.component.scss'
})
export class UiCellEditableStringComponent extends UiCellEditableComponent {}

