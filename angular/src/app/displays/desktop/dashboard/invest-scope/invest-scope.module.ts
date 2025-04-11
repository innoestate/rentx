import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { InvestScopeDisplayerAdapter } from 'src/app/features/invest-scope/adapter/invest-scope.displayer.adapter';
import { InvestScopeDisplayStoreFacade } from 'src/app/features/invest-scope/states/display/facades/invest-scope.display-store.facade';
import { investScopeReducer } from 'src/app/features/invest-scope/states/display/ngrx/invest-scope.reducers';
import { UiDynamicComponentComponent } from 'src/app/ui/components/ui-dynamic-component/ui-dynamic-component.component';
import { DynamicComponentFactoryService } from 'src/app/ui/services/factory/dynamic-component-factory.service';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopProspectionsActionsComponent } from './components/actions/desktop-prospections-actions.component';
import { DesktopProspectionsNavigationComponent } from './components/navigation/desktop-prospections-navigation.component';
import { InvestScopeFactory } from './factories/invest-scope.factory';
import { InvestScopeComponent } from './invest-scope.component';
import { InvestScopeDesktopRoutingModule } from './invest-scope.routing';
import { DesktopProspectionsModule } from './modules/prospections/desktop-prospections.module';
import { DesktopSellersModule } from './modules/sellers/desktop-sellers.module';



@NgModule({
  declarations: [
    InvestScopeComponent,
    DesktopProspectionsNavigationComponent,
    DesktopProspectionsActionsComponent
  ],
  imports: [
    StoreModule.forFeature('investScope', investScopeReducer),
    InvestScopeDesktopRoutingModule,
    UiModule.forChild(),
    UiDynamicComponentComponent,
    DesktopProspectionsModule,
    DesktopSellersModule
  ],
  providers: [
    InvestScopeDisplayStoreFacade,
    InvestScopeDisplayerAdapter,
    {
      provide: DynamicComponentFactoryService,
      useClass: InvestScopeFactory
    },
  ]
})
export class InvestScopeModule {

  constructor() {}

}
