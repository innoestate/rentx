import { AfterViewChecked, Component, ElementRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DisplayerManager } from '../../displayers/displayer.manager';
import { UiDisplayerComponent } from '../ui-displayer/ui-displayer.component';

@Component({
  selector: 'ui-navigation',
  imports: [UiDisplayerComponent],
  templateUrl: './ui-navigation.component.html',
  styleUrls: ['./ui-navigation.component.scss']
})
export class UiNavigationComponent extends UiDisplayerComponent implements AfterViewChecked {

  navigators: {label: string, navigate: string}[] = [];
  protected activeNavigator = toSignal(this.displayStateManager.onNavigation());

  constructor(protected override elRef: ElementRef, protected displayStateManager: DisplayerManager){
    super(elRef);
  }

  ngAfterViewChecked(): void {
    const cardContent = this.elRef.nativeElement.querySelector('.card-content');
    if(cardContent){
      cardContent.style.transition = `all ${500}ms`;
      const navigators = cardContent.querySelectorAll('.navigator') as NodeListOf<HTMLElement>;
      const maxSize = Array.from(navigators).reduce((max, navigator) => {
        return Math.max(max, navigator.offsetWidth);
      }, 0);
      cardContent.style.width = `${maxSize}px`;
    }
  }

  protected getNavigation(): {label: string, navigate: string}[] {
    return [];
  }

  protected navigate(navigation: string) {
    this.displayStateManager.navigate(navigation);
  }

}
