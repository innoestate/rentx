import { EventEmitter, Injectable, Signal, signal } from "@angular/core";
/**
 * Adapter that maps the component list (string[]) to the dynamic components (string[][])
 * It typically reorganize components positions between themselves.
 */

@Injectable()
export class InvestScopeDisplayerAdapter {

  constructor() { }

  mapDynamicComponents(componentsList: string[], dynamicComponents: {name: string, replace: EventEmitter<string>}[][]): void {

    console.log('mapDynamicComponents', componentsList, dynamicComponents);

    if (dynamicComponents.length <= 0) {
      dynamicComponents.push([{name: 'navigation', replace: new EventEmitter()}], [{name: 'prospections', replace: new EventEmitter()}], [{name: 'actions', replace: new EventEmitter()}]);
    } else {
      let left = dynamicComponents[0];
      let center = dynamicComponents[1];
      let right = dynamicComponents[2];

      if (!center.find( item => item.name === 'prospections') && !center.find( item => item.name === 'sellers')) {
        center.push({ name: 'prospections', replace: new EventEmitter()})
      } else if (componentsList.includes('sellers')) {
        center[0].replace.emit('sellers');
      } else if (componentsList.includes('prospections')) {
        center[0].replace.emit('prospections');
      }

      if(componentsList.includes('sellers') && right.length > 1 && right[1].name === 'prospectionDescription'){
        right[1].replace.emit('');
      }else if(!componentsList.includes('prospectionDescription') && right.length > 1 && right[1].name === ''){
        right[1].replace.emit('prospectionDescription');
      }else if(componentsList.includes('prospectionDescription') && right.length > 1 && right[1].name === ''){
        right[1].replace.emit('prospectionDescription');
      }else if(componentsList.includes('prospectionDescription') && right.length > 1 && right[1].name !== 'prospectionDescription'){
        right[1].replace.emit('prospectionDescription');
      }else if(componentsList.includes('prospectionDescription') && !right.find( item => item.name === 'prospectionDescription')){
        right.push({name: 'prospectionDescription', replace: new EventEmitter()});
        right.push({name: 'actions', replace: new EventEmitter()});
      }else if(!componentsList.includes('prospectionDescription') && right.find( item => item.name === 'prospectionDescription')){
        right[1].replace.emit('');
      }

    }

  }

}
