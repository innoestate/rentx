import { AfterViewChecked, Component, ElementRef, input, signal } from '@angular/core';
import { UiNavigator } from '../ui-navigator/model/ui-navigator.model';
import { UiNavigatorComponent } from '../ui-navigator/ui-navigator.component';

@Component({
  selector: 'ui-navigation',
  imports: [UiNavigatorComponent],
  templateUrl: './ui-navigation.component.html',
  styleUrls: ['./ui-navigation.component.scss']
})
export class UiNavigationComponent implements AfterViewChecked {

  protected navigators = signal<UiNavigator[]>([]);

  constructor(protected elRef: ElementRef){}

  ngAfterViewChecked(): void {
    if(this.elRef?.nativeElement){
      const navigators = (this.elRef.nativeElement as HTMLDivElement).querySelectorAll('.navigator') as NodeListOf<HTMLElement>;
      const maxSize = Array.from(navigators).reduce((max, navigator) => {
        return Math.max(max, navigator.offsetWidth);
      }, 0);
      this.elRef.nativeElement.style.width = `${maxSize + 32}px`;
    }
  }

  navigate(navigate: string) {}

}
