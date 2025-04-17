import { EventEmitter, Injectable, Signal, signal } from "@angular/core";
import { UiDisplayerComponent } from "src/app/ui/components/ui-displayer/ui-displayer.component";
/**
 * Adapter that maps the component list (string[]) to the dynamic components (string[][])
 * It typically reorganize components positions between themselves.
 */

@Injectable()
export class InvestScopeDisplayerAdapter {

  constructor() { }

  mapDynamicComponents(componentsList: string[], dynamicComponents: {name: string, replace: EventEmitter<{name:string, appearsDelay? : true}>}[][]): void {

    console.log('mapDynamicComponents', componentsList, dynamicComponents);


    if(dynamicComponents.length <= 0){

        for(let i = 0; i < 3; i ++){
          const array: { name: string, replace: EventEmitter<{name:string, appearsDelay?: true}>}[] = [];
          for (let i = 0; i < 3; i ++ ){
            array.push({ name: '', replace: new EventEmitter<{name:string, appearsDelay?: true}>() });
          }
          dynamicComponents.push(array);
        }

    }

    setTimeout(() => {

      let left = dynamicComponents[0];
      let center = dynamicComponents[1];
      let right = dynamicComponents[2];

      if(componentsList.includes('navigation') && left[0].name === ''){
        left[0].replace.emit({name: 'navigation'});
      }
      if(componentsList.includes('actions') && right[0].name === ''){
        right[0].replace.emit({name: 'actions'});
      }


      if (!center.find( item => item.name === 'prospections') && !center.find( item => item.name === 'sellers')) {
        center[0].replace.emit({name: 'prospections'});
      } else if (componentsList.includes('sellers')) {
        center[0].replace.emit({name: 'sellers'});
      } else if (componentsList.includes('prospections')) {
        center[0].replace.emit({name: 'prospections'});
      }

      // if( right.length > 1 && right[1].name === 'navigation'){
      //   right[1].replace.emit('prospectionDescription');
      // }else

      if(componentsList.includes('prospectionDescription')){
        right[1].replace.emit({name: 'prospectionDescription'});

        // setTimeout(() => {
        //   right[1].replace.emit({name: 'prospectionDescription'});
        // }, UiDisplayerComponent.ANIMATION_DELAY*2);
      }else{
        right[1].replace.emit({name: ''});
      }


      // if(componentsList.includes('sellers') && right[1].name === 'prospectionDescription'){
      //   right[1].replace.emit('');
      // }else if(!componentsList.includes('prospectionDescription') && right.length > 1 && right[1].name === ''){
      //   right[1].replace.emit('prospectionDescription');
      // }else if(componentsList.includes('prospectionDescription') && right.length > 1 && right[1].name === ''){
      //   right[1].replace.emit('prospectionDescription');
      // }else if(componentsList.includes('prospectionDescription') && right.length > 1 && right[1].name !== 'prospectionDescription'){
      //   right[1].replace.emit('prospectionDescription');
      // }else if(componentsList.includes('prospectionDescription') && !right.find( item => item.name === 'prospectionDescription')){
      //   right[1].replace.emit('prospectionDescription');
      //   right[2].replace.emit('actions');
      // }else if(!componentsList.includes('prospectionDescription') && right.find( item => item.name === 'prospectionDescription')){
      //   right[1].replace.emit('');
      // }

    }, 0);


  }

}
