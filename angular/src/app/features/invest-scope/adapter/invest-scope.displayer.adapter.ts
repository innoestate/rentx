import { Injectable } from "@angular/core";

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

  }

}
