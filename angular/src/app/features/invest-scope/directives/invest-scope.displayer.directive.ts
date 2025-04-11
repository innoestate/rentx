import { Directive, effect } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { InvestScopeDisplayerAdapter } from "../adapter/invest-scope.displayer.adapter";
import { InvestScopeDisplayedElement } from "../models/invest-scope.display-map.model";
import { InvestScopeDisplayStoreFacade } from "../states/display/facades/invest-scope.display-store.facade";

@Directive()
export class InvestScopeDisplayerDirective {

  private componentsList = toSignal(this.displayStoreFacade.onUpdateDisplay());
  protected dynamicComponents: InvestScopeDisplayedElement[][] = [];

  constructor(protected displayStoreFacade: InvestScopeDisplayStoreFacade,
    protected adapter: InvestScopeDisplayerAdapter) {
    this.mapDynamicComponents();
  }

  private mapDynamicComponents() {
    effect(() => {
      this.adapter.mapDynamicComponents(this.componentsList() || [], this.dynamicComponents);
    });
  }

  ngOnInit() {
    this.displayStoreFacade.init('prospections');
  }

}
