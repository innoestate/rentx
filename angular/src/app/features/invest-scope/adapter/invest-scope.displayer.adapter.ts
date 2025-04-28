import { EventEmitter, Injectable } from "@angular/core";
import { UiDynamicComponent } from "src/app/ui/components/ui-dynamic-component/models/ui-dynamic-component.model";
/**
 * Adapter that maps the component list (string[]) to the dynamic components (string[][])
 * It typically reorganize components positions between themselves.
 */

@Injectable()
export class InvestScopeDisplayerAdapter {

  constructor() { }

  static fillDynamicComponents(dynamicComponents: UiDynamicComponent[][]){
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
      InvestScopeDisplayerAdapter.fillDynamicComponents(dynamicComponents);
      this.instanciateDynamicComponents(componentsList, dynamicComponents)
    }else{
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

  private buildMapping(dynamicComponents: UiDynamicComponent[][], componentsList: string[]) {

    console.log('buildMapping', componentsList);

    if (componentsList.includes('navigation') && dynamicComponents[0][0].name === '') {
      this.emitReplacement(dynamicComponents[0][0], 'navigation');
    }
    if (componentsList.includes('actions') && dynamicComponents[2][0].name === '') {
      this.emitReplacement(dynamicComponents[2][0], 'actions');
    }

    if (!dynamicComponents[1].find(item => item.name === 'prospections') && !dynamicComponents[1].find(item => item.name === 'sellers')) {
      this.emitReplacement(dynamicComponents[1][0], 'prospections');
    } else if (componentsList.includes('sellers')) {
      this.emitReplacement(dynamicComponents[1][0], 'sellers');
    } else if (componentsList.includes('prospections')) {
      this.emitReplacement(dynamicComponents[1][0], 'prospections');
    }

    if (componentsList.includes('prospections') && !dynamicComponents[1].find(item => item.name === 'prospectionDescription')) {
      this.emitReplacement(dynamicComponents[2][1], 'prospectionDescription');
    } else if (!componentsList.includes('prospections')){
      this.emitReplacement(dynamicComponents[2][1], '');
    }
  }

}
