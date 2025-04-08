
import { InjectionToken } from '@angular/core';

export interface IconDefinition {
  name: string;
  svg: string;
}

export const ICON_REGISTRY = new InjectionToken<IconDefinition[]>('IconRegistry');