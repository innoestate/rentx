import { Component, input, ViewContainerRef } from '@angular/core';
import { DynamicComponentFactoryService } from '../../services/factory/dynamic-component-factory.service';

@Component({
  selector: 'ui-dynamic-component',
  standalone: true,
  template: '',
})
export class UiDynamicComponentComponent {

  component = input.required<string>();

  constructor(private factory: DynamicComponentFactoryService, private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.viewContainerRef.createComponent(this.factory.getComponent(this.component()));
  }

}
