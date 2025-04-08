import { Component, input } from '@angular/core';
import { UiAction } from './models/ui-action.model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'ui-actions',
  imports: [NzIconModule, UiIconComponent],
  templateUrl: './ui-actions.component.html',
  styleUrl: './ui-actions.component.scss'
})
export class UiActionsComponent {

  actions = input.required<UiAction[]>();

}
