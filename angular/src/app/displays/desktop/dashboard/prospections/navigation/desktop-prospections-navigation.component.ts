import { Component, signal } from '@angular/core';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';
import { UiNavigator } from 'src/app/ui/components/ui-navigator/model/ui-navigator.model';

@Component({
  selector: 'desktop-prospections-navigation',
  standalone: false,
  templateUrl: './desktop-prospections-navigation.component.html',
  styleUrl: './desktop-prospections-navigation.component.scss'
})
export class DesktopProspectionsNavigationComponent {

  navigators = signal<UiNavigator[]>([]);

  constructor(private localizations: LocalizationsService){

    this.navigators.set([
      {
        label: this.localizations.getLocalization('prospections', 'label'),
        navigate: '/desktop/me/dashboard/prospections/main'
      },
      {
        label: this.localizations.getLocalization('sellers', 'label'),
        navigate: '/desktop/me/dashboard/prospections/sellers'
      }
    ]);

  }

}
