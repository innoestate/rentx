import { Directive, effect, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UiDynamicComponent } from 'src/app/ui/components/ui-dynamic-component/models/ui-dynamic-component.model';
import { PropertiesDisplayerAdapter } from '../adapter/properties.displayer.adapter';
import { PropertiesDisplayerManager } from '../displayer/properties.displayer.manager';

@Directive({
  selector: '[appPropertiesDisplayer]',
})
export class PropertiesDisplayerDirective implements OnInit {
  private componentsList = toSignal(this.displayManager.onDisplayComponents());
  protected displays: UiDynamicComponent[][] = [];

  constructor(
    protected displayManager: PropertiesDisplayerManager,
    protected adapter: PropertiesDisplayerAdapter
  ) {}

  private mapDynamicComponents(): void {
    effect(() => {
      this.adapter.mapDynamicComponents(this.componentsList() || [], this.displays);
    });
  }

  ngOnInit(): void {
    this.displayManager.init();
    this.mapDynamicComponents();
  }
}
