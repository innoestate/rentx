import { Component, effect, ElementRef, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';
import { InvestScopeDisplayStoreFacade } from 'src/app/features/invest-scope/states/display/facades/invest-scope.display-store.facade';
import { UiNavigationComponent } from 'src/app/ui/components/ui-navigation/ui-navigation.component';
import { UiNavigator } from 'src/app/ui/components/ui-navigator/model/ui-navigator.model';

@Component({
  selector: 'desktop-prospections-navigation',
  standalone: false,
  templateUrl: './desktop-prospections-navigation.component.html',
  styleUrl: './desktop-prospections-navigation.component.scss'
})
export class DesktopProspectionsNavigationComponent extends UiNavigationComponent {

  override navigators = signal<UiNavigator[]>([]);
  activeNavigator = toSignal(this.investScopeDisplayStoreFacade.onNavigation());

  constructor(protected override elRef: ElementRef,
    private investScopeDisplayStoreFacade: InvestScopeDisplayStoreFacade,
    private localizations: LocalizationsService) {
    super(elRef);

    this.navigators.set([
      {
        label: this.localizations.getLocalization('prospections', 'label'),
        navigate: 'prospections'
      },
      {
        label: this.localizations.getLocalization('sellers', 'label'),
        navigate: 'sellers'
      }
    ]);
  }

  override navigate(navigation: 'prospections' | 'sellers') {
    this.investScopeDisplayStoreFacade.navigate(navigation);
  }

}
