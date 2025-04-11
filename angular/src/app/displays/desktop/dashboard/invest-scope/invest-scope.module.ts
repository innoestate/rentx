import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { InvestScopeDisplayerAdapter } from 'src/app/features/invest-scope/adapter/invest-scope.displayer.adapter';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';
import { InvestScopeDisplayStoreFacade } from 'src/app/features/invest-scope/states/display/facades/invest-scope.display-store.facade';
import { investScopeReducer } from 'src/app/features/invest-scope/states/display/ngrx/invest-scope.reducers';
import { DisplayerManager } from 'src/app/ui/displayers/displayer.manager';
import { DynamicComponentFactoryService } from 'src/app/ui/services/factory/dynamic-component-factory.service';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopProspectionsActionsComponent } from './components/actions/desktop-prospections-actions.component';
import { InvestScopeFactory } from './factories/invest-scope.factory';
import { InvestScopeComponent } from './invest-scope.component';
import { InvestScopeDesktopRoutingModule } from './invest-scope.routing';
import { DesktopProspectionsModule } from './modules/prospections/desktop-prospections.module';
import { DesktopSellersModule } from './modules/sellers/desktop-sellers.module';



@NgModule({
  declarations: [
    InvestScopeComponent,
    DesktopProspectionsActionsComponent
  ],
  imports: [
    StoreModule.forFeature('investScope', investScopeReducer),
    InvestScopeDesktopRoutingModule,
    UiModule.forChild(),
    DesktopProspectionsModule,
    DesktopSellersModule
  ],
  providers: [
    InvestScopeDisplayManager,
    InvestScopeDisplayerAdapter,
    InvestScopeDisplayStoreFacade,
    {
      provide: DynamicComponentFactoryService,
      useClass: InvestScopeFactory
    },
    {
      provide: DisplayerManager,
      useClass: InvestScopeDisplayManager
    }
  ]
})
export class InvestScopeModule {

  constructor() {}

}
