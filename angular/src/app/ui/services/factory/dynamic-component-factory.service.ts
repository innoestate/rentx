import { Injectable, Type } from "@angular/core";
import { FactoryComponentData } from "./models/build-component-data.model";


//!important! All components must inherit from UiDisplayerComponent
@Injectable()
export abstract class DynamicComponentFactoryService {

  protected componentMap: { [key: string]: FactoryComponentData } = {};

  getComponent(type: string): FactoryComponentData {
    const component = this.componentMap[type];
    if (!component) {
      throw new Error(`Composant non trouvé pour le type : ${type}`);
    }
    return component;
  }
}
