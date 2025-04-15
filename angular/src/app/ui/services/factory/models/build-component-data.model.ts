import { Type } from "@angular/core";

export interface FactoryComponentData {
  component: Type<any>;
  values?: [{key: any}];
}