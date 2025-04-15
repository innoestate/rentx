import { Directive, effect, EventEmitter, Signal, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { InvestScopeDisplayerAdapter } from "../adapter/invest-scope.displayer.adapter";
import { InvestScopeDisplayedElement } from "../models/invest-scope.display-map.model";
import { InvestScopeDisplayManager } from "../displayer/invest-scope.displayer.manager";

@Directive()
export class InvestScopeDisplayerDirective {

  private componentsList = toSignal(this.displayManager.onDisplayComponents());
  protected displays: { name: string, replace: EventEmitter<string>}[][] = [];

  constructor(protected displayManager: InvestScopeDisplayManager,
    protected adapter: InvestScopeDisplayerAdapter) {
    this.mapDynamicComponents();
  }

  private mapDynamicComponents() {
    effect(() => {
      this.adapter.mapDynamicComponents(this.componentsList() || [], this.displays);
    });
  }

  ngOnInit() {
    this.displayManager.init('prospections');
  }

}
