import { EventEmitter } from "@angular/core";

export interface UiDynamicComponent {
  name: string,
  replace: EventEmitter<string>
  emitting: boolean;
}