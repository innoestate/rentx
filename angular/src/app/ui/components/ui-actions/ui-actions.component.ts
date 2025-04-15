import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DisplayerManager } from '../../displayers/displayer.manager';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'ui-actions',
  imports: [UiIconComponent],
  templateUrl: './ui-actions.component.html',
  styleUrl: './ui-actions.component.scss'
})
export class UiActionsComponent {

  protected actions: { label: string, icon: string, command: () => void }[] = [] ;// toSignal(this.displayStateManager.getActions());

  constructor(protected displayStateManager: DisplayerManager) { }

}
