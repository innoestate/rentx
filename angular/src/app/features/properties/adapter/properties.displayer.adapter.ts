import { EventEmitter, Injectable } from '@angular/core';
import { UiDynamicComponent } from 'src/app/ui/components/ui-dynamic-component/models/ui-dynamic-component.model';

/**
 * Adapter that maps the component list (string[]) to the dynamic components (string[][])
 * It typically reorganize components positions between themselves.
 */
@Injectable({
  providedIn: 'root',
})
export class PropertiesDisplayerAdapter {
  constructor() {}

  static fillDynamicComponents(dynamicComponents: UiDynamicComponent[][]): void {
    for (let i = 0; i < 3; i++) {
      const array: UiDynamicComponent[] = [];
      for (let i = 0; i < 3; i++) {
        array.push({ name: '', replace: new EventEmitter<string>() });
      }
      dynamicComponents.push(array);
    }
  }

  mapDynamicComponents(componentsList: string[], dynamicComponents: UiDynamicComponent[][]): void {
    if (dynamicComponents.length <= 0) {
      PropertiesDisplayerAdapter.fillDynamicComponents(dynamicComponents);
      this.instanciateDynamicComponents(componentsList, dynamicComponents);
    } else {
      this.buildMapping(dynamicComponents, componentsList);
    }
  }

  private instanciateDynamicComponents(componentsList: string[], dynamicComponents: UiDynamicComponent[][]): void {
    setTimeout(() => {
      this.buildMapping(dynamicComponents, componentsList);
    }, 0);
  }

  private emitReplacement(dynamicComponent: UiDynamicComponent, component: string): void {
    dynamicComponent.replace.emit(component);
  }

  private buildMapping(dynamicComponents: UiDynamicComponent[][], componentsList: string[]): void {

    if (componentsList.includes('navigation') && dynamicComponents[0][0].name === '') {
      this.emitReplacement(dynamicComponents[0][0], 'navigation');
    }

    if (componentsList.includes('actions') && dynamicComponents[2][0].name === '') {
      this.emitReplacement(dynamicComponents[2][0], 'actions');
    }

    if (!dynamicComponents[1].find(item => item.name === 'estates') &&
        !dynamicComponents[1].find(item => item.name === 'owners') &&
        !dynamicComponents[1].find(item => item.name === 'lodgers')) {
      this.emitReplacement(dynamicComponents[1][0], 'estates');
    } else if (componentsList.includes('owners')) {
      this.emitReplacement(dynamicComponents[1][0], 'owners');
    } else if (componentsList.includes('lodgers')) {
      this.emitReplacement(dynamicComponents[1][0], 'lodgers');
    } else if (componentsList.includes('estates')) {
      this.emitReplacement(dynamicComponents[1][0], 'estates');
    }
  }
}
