import { Component, input, Input } from '@angular/core';
import { UiNavigatorComponent } from '../ui-navigator/ui-navigator.component';
import { UiNavigator } from '../ui-navigator/model/ui-navigator.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ui-navigation',
  imports: [UiNavigatorComponent],
  templateUrl: './ui-navigation.component.html',
  styleUrls: ['./ui-navigation.component.scss'],
  animations: [
    trigger('sizeChange', [
      transition('* <=> *', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style('*'))
      ])
    ])
  ],
  host: {
    '[@sizeChange]': ''
  }
})
export class UiNavigationComponent {

  navigators = input.required<UiNavigator[]>();

}
