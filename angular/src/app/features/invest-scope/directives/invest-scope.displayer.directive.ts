import { Directive, effect } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { UiDynamicComponent } from "src/app/ui/components/ui-dynamic-component/models/ui-dynamic-component.model";
import { InvestScopeDisplayerAdapter } from "../adapter/invest-scope.displayer.adapter";
import { InvestScopeDisplayManager } from "../displayer/invest-scope.displayer.manager";

@Directive()
export class InvestScopeDisplayerDirective {

  private componentsList = toSignal(this.displayManager.onDisplayComponents());
  protected displays: UiDynamicComponent[][] = [];

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
    this.displayManager.init();
  }

}
