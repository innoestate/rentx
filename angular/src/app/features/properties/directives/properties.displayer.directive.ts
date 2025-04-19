import { Directive, effect, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UiDynamicComponent } from 'src/app/ui/components/ui-dynamic-component/models/ui-dynamic-component.model';
import { PropertiesDisplayAdapter } from '../adapter/properties.displayer.adapter';
import { PropertiesDisplayerManager } from '../displayer/properties.displayer.manager';

@Directive({
  selector: '[appPropertiesDisplayer]',
})
export class PropertiesDisplayerDirective implements OnInit {
  private componentsList = toSignal(this.displayManager.onDisplayComponents());
  protected displays: UiDynamicComponent[][] = [];

  constructor(
    protected displayManager: PropertiesDisplayerManager,
    protected adapter: PropertiesDisplayAdapter
  ) {
    this.displayManager.init();
    this.mapDynamicComponents();
  }

  private mapDynamicComponents(): void {
    effect(() => {
      console.log('mapDynamicComponents', this.componentsList(), this.displays);
      this.adapter.mapDynamicComponents(this.componentsList() || [], this.displays);
      console.log(this.displays);
    });
  }

  ngOnInit(): void {

  }
}
