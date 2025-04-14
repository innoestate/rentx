import { Component, input } from '@angular/core';
import { DisplayerManager } from '../../displayers/displayer.manager';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { UiAction } from './models/ui-action.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ui-actions',
  imports: [UiIconComponent],
  templateUrl: './ui-actions.component.html',
  styleUrl: './ui-actions.component.scss'
})
export class UiActionsComponent {

  protected actions = toSignal(this.displayStateManager.getActions());

  constructor(protected displayStateManager: DisplayerManager) { }

}
