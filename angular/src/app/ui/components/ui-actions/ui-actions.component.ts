import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DisplayerManager } from '../../displayers/displayer.manager';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { UiDisplayerComponent } from '../ui-displayer/ui-displayer.component';

@Component({
  selector: 'ui-actions',
  imports: [UiIconComponent],
  templateUrl: './ui-actions.component.html',
  styleUrl: './ui-actions.component.scss'
})
export class UiActionsComponent extends UiDisplayerComponent implements OnInit, AfterViewInit {

  actions: { label: string, icon: string, command: () => void }[] = [];// toSignal(this.displayStateManager.getActions());

  test = [{ label: 'test', icon: 'test', command: () => { } }, { label: 'test2', icon: 'test2', command: () => { } }]

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
