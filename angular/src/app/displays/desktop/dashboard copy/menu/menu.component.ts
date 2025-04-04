import { Component } from '@angular/core';
import { MenuComponent } from 'src/app/displays/common/components/menu.component';
import { UiDropdownItem } from 'src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model';

@Component({
    selector: 'rentx-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    standalone: false
})
export class MenuDesktopComponent extends MenuComponent {

  dropDownTrigger = {
    value: 'Menu',
    label: ''
  }
  dropDown : UiDropdownItem<any>[] = [
    {
      label: 'déconnexion',
      value: 'logout',
      command: () => this.logout()
    },
    {
      label: 'thème',
      value: [
        {
          label: 'mode',
          value: [
            {
              label: 'jour',
              value: 'light',
              command: () => this.themeService.setMode('light')
            },
            {
              label: 'nuit',
              value: 'dark',
              command: () => this.themeService.setMode('dark')
            }
          ]
        },
        {
          label: 'default',
          value: 'default',
          command: () => this.themeService.setTheme('default')
        },
        {
          label: 'pink',
          value: 'pink',
          command: () => this.themeService.setTheme('pink')
        }
      ]
    }
  ];

}
