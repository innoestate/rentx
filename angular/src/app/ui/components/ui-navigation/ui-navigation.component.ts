import { Component, input } from '@angular/core';
import { UiNavigatorComponent } from '../ui-navigator/ui-navigator.component';
import { UiNavigator } from '../ui-navigator/model/ui-navigator.model';

@Component({
  selector: 'ui-navigation',
  imports: [UiNavigatorComponent],
  templateUrl: './ui-navigation.component.html',
  styleUrl: './ui-navigation.component.scss'
})
export class UiNavigationComponent {

  navigators = input.required<UiNavigator[]>();

}
