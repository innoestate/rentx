import { AfterViewChecked, Component, ElementRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DisplayerManager } from '../../displayers/displayer.manager';

@Component({
  selector: 'ui-navigation',
  imports: [],
  templateUrl: './ui-navigation.component.html',
  styleUrls: ['./ui-navigation.component.scss']
})
export class UiNavigationComponent implements AfterViewChecked {

  protected navigators = toSignal(this.displayStateManager.getNavigation());
  protected activeNavigator = toSignal(this.displayStateManager.onNavigation());

  constructor(protected elRef: ElementRef, protected displayStateManager: DisplayerManager){}

  ngAfterViewChecked(): void {
    if(this.elRef?.nativeElement){
      const navigators = (this.elRef.nativeElement as HTMLDivElement).querySelectorAll('.navigator') as NodeListOf<HTMLElement>;
      const maxSize = Array.from(navigators).reduce((max, navigator) => {
        return Math.max(max, navigator.offsetWidth);
      }, 0);
      this.elRef.nativeElement.style.width = `${maxSize + 32}px`;
    }
  }

  protected navigate(navigation: string) {
    this.displayStateManager.navigate(navigation);
  }

}
