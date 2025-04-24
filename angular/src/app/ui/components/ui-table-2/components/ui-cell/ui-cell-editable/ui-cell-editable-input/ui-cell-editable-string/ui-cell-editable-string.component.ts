import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiInputComponent } from 'src/app/ui/components/ui-input/ui-input.component';
import { UiLabelComponent } from '../../../../ui-label/ui-label.component';
import { UiCellEditableInputComponent } from '../ui-cell-editable-input.component';

@Component({
  selector: 'ui-cell-editable-string',
  imports: [CommonModule, UiLabelComponent, UiInputComponent],
  templateUrl: './ui-cell-editable-string.component.html',
  styleUrl: './ui-cell-editable-string.component.scss'
})
export class UiCellEditableStringComponent extends UiCellEditableInputComponent {}

