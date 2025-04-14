import { Injectable } from "@angular/core";
/**
 * Adapter that maps the component list (string[]) to the dynamic components (string[][])
 * It typically reorganize components positions between themself.
 */

@Injectable()
export class InvestScopeDisplayerAdapter {

  constructor() { }

  mapDynamicComponents(componentsList: string[], dynamicComponents: string[][]){

    if(componentsList[2] === 'prospections'){
      dynamicComponents[1].pop();
      dynamicComponents[1].push('prospections');
    }else if(componentsList.includes('prospections')){
      dynamicComponents.push(['navigation'], ['prospections'], ['actions']);
    }else{
      dynamicComponents[1].pop();
      dynamicComponents[1].push('sellers');
    }

    if(componentsList.includes('prospection-description')){
      dynamicComponents[2].push('prospection-description');
    }else if (dynamicComponents[2].includes('prospection-description')){
      dynamicComponents[2].pop();
    }

  }

}
