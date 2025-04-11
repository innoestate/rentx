import { Injectable, Type } from "@angular/core";

@Injectable()
export abstract class DynamicComponentFactoryService {

  protected componentMap: { [key: string]: Type<any> } = {};

  getComponent(type: string): Type<any> {
    const component = this.componentMap[type];
    if (!component) {
      throw new Error(`Composant non trouvé pour le type : ${type}`);
    }
    return component;
  }
}
