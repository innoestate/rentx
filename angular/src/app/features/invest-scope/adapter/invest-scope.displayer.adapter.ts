import { Injectable } from "@angular/core";
/**
 * Adapter that maps the component list (string[]) to the dynamic components (string[][])
 * It typically reorganize components positions between themself.
 */

@Injectable()
export class InvestScopeDisplayerAdapter {

  constructor() { }

  //Should update without lost array instances
  mapDynamicComponents(componentsList: string[], dynamicComponents: string[][]): void {

    if (dynamicComponents.length <= 0) {
      dynamicComponents.push(['navigation'], ['prospections'], ['actions']);
    } else {
      let left = dynamicComponents[0];
      let center = dynamicComponents[1];
      let right = dynamicComponents[2];

      if (!left.includes('navigation')) {
        left.push('navigation')
      }

      if (!right.includes('actions')) {
        right.push('actions')
      }

      if (!center.includes('prospections') && !center.includes('sellers')) {
        center.push('prospections')
      } else if (componentsList.includes('sellers')) {
        center.pop();
        center.push('sellers');
      } else if (componentsList.includes('prospections')) {
        center.pop();
        center.push('prospections');
      }

      if(componentsList.includes('prospectionDescription') && !right.includes('prospectionDescription')){
        right.push('prospectionDescription');
      }else if(!componentsList.includes('prospectionDescription') && right.includes('prospectionDescription')){
        right.splice(1, 1);
      }

    }

  }

}
