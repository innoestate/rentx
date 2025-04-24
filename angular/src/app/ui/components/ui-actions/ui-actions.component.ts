import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { DisplayerManager } from '../../displayers/displayer.manager';
import { UiDisplayerComponent } from '../ui-displayer/ui-displayer.component';
import { UiIcon } from '../ui-icon/models/ui-icon.model';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'ui-actions',
  imports: [UiIconComponent],
  templateUrl: './ui-actions.component.html',
  styleUrl: './ui-actions.component.scss'
})
export class UiActionsComponent extends UiDisplayerComponent implements OnInit, AfterViewInit {

  actions: { label: string, icon: UiIcon, command: () => void }[] = [];// toSignal(this.displayStateManager.getActions());

  constructor(protected displayStateManager: DisplayerManager, protected override elRef: ElementRef) {
    super(elRef);
  }


  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  getContentWidth() {
    const container = this.elRef.nativeElement.querySelector('.card-content') as HTMLDivElement;
    if (!container) {
      return 0;
    }
    return Array.from(container.children).reduce((acc, child) => acc + (child as HTMLElement).offsetWidth, 0);
  }

  public appears2() {
    this.elRef.nativeElement.style.transition = `all ${500}ms ease-in`;
    this.elRef.nativeElement.style.transform = `scale(0)`;

    setTimeout(() => {
      this.elRef.nativeElement.style.transform = `scale(1)`;
    }, 0);
  }


}
