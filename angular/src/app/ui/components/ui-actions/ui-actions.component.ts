import { Component, input } from '@angular/core';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { UiAction } from './models/ui-action.model';

@Component({
  selector: 'ui-actions',
  imports: [UiIconComponent],
  templateUrl: './ui-actions.component.html',
  styleUrl: './ui-actions.component.scss'
})
export class UiActionsComponent {

  actions = input.required<UiAction[]>();

}
