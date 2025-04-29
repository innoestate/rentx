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
        array.push({ name: '', replace: new EventEmitter<string>(), emitting: false });
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
    if(dynamicComponent.name !== component){
      dynamicComponent.replace.emit(component);
    }
    dynamicComponent.emitting = true;
  }

  private buildMapping(dynamicComponents: UiDynamicComponent[][], componentsList: string[]) {
    this.resetEmitting(dynamicComponents);

    // dynamicComponents[0][0].emitting = false;

    console.log('componentList', componentsList);
    console.log('dynamicComponents', dynamicComponents[0][1].emitting);
    if(componentsList.includes('prospections')){
      this.emitReplacement(dynamicComponents[0][0], 'navigation');
      this.emitReplacement(dynamicComponents[1][0], 'prospections');
      this.emitReplacement(dynamicComponents[2][0], 'actions');
      this.emitReplacement(dynamicComponents[2][1], 'prospectionDescription');
    }else if ( componentsList.includes('sellers')){
      this.emitReplacement(dynamicComponents[0][0], 'navigation');
      this.emitReplacement(dynamicComponents[1][0], 'sellers');
      this.emitReplacement(dynamicComponents[2][0], 'actions');
    }else if (componentsList.includes('offer')){
      this.emitReplacement(dynamicComponents[0][0], 'backToProspectionNavigation');
      this.emitReplacement(dynamicComponents[0][1], 'prospectionsTableMini');
      this.emitReplacement(dynamicComponents[0][2], 'prospectionDescription');
      this.emitReplacement(dynamicComponents[1][0], 'offer');
    }
    console.log('dynamicComponents', dynamicComponents[0][1].emitting);

    this.clearDynamicComponents(dynamicComponents, componentsList);
  }

  private buildMappingDraft(dynamicComponents: UiDynamicComponent[][], componentsList: string[]) {

    console.log('buildMapping', componentsList);

    if (componentsList.includes('navigation') && dynamicComponents[0][0].name === '') {
      this.emitReplacement(dynamicComponents[0][0], 'navigation');
    }
    if (componentsList.includes('actions') && dynamicComponents[2][0].name === '') {
      this.emitReplacement(dynamicComponents[2][0], 'actions');
    }

    if(componentsList.includes('offer')){
      this.emitReplacement(dynamicComponents[0][0], 'backToProspectionNavigation');
      this.emitReplacement(dynamicComponents[0][1], 'prospectionSmallTable');
      this.emitReplacement(dynamicComponents[0][2], 'prospectionDescription');
      this.emitReplacement(dynamicComponents[1][0], 'offer');
      this.emitReplacement(dynamicComponents[2][0], '');
      this.emitReplacement(dynamicComponents[2][1], '');
    }else if (!dynamicComponents[1].find(item => item.name === 'prospections') && !dynamicComponents[1].find(item => item.name === 'sellers')) {
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

  private resetEmitting(dynamicComponents: UiDynamicComponent[][]){
    dynamicComponents.forEach(components => {
      components.forEach(component => {
        component.emitting = false;
      });
    });
  }

  private clearDynamicComponents(dynamicComponents: UiDynamicComponent[][], list: string[]){
    dynamicComponents.forEach(components => {
      components.filter(component => !component.emitting).forEach(item => {
        this.emitReplacement(item, '');
      });
    });
  }

}
