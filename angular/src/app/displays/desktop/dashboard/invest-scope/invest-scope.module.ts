import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { InvestScopeDisplayerAdapter } from 'src/app/features/invest-scope/adapter/invest-scope.displayer.adapter';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';
import { InvestScopeDisplayStoreFacade } from 'src/app/features/invest-scope/states/display/facades/invest-scope.display-store.facade';
import { investScopeReducer } from 'src/app/features/invest-scope/states/display/ngrx/invest-scope.reducers';
import { DisplayerManager } from 'src/app/ui/displayers/displayer.manager';
import { DynamicComponentFactoryService } from 'src/app/ui/services/factory/dynamic-component-factory.service';
import { UiModule } from 'src/app/ui/ui.module';
import { InvestScopeFactory } from './factories/invest-scope.factory';
import { InvestScopeComponent } from './invest-scope.component';
import { InvestScopeDesktopRoutingModule } from './invest-scope.routing';
import { DesktopProspectionsModule } from './modules/prospections/desktop-prospections.module';
import { DesktopSellersModule } from './modules/sellers/desktop-sellers.module';
import { DesktopProspectionsTableMiniComponent } from './components/prospections-table-mini/desktop-prospections-table-mini.component';
import { OffersEmailHttpService } from 'src/app/features/offers/service/offers.email.http.service';
import { OfferPdfCommand } from 'src/app/features/offers/commands/offer.pdf.command';



@NgModule({
  declarations: [
    InvestScopeComponent,
    DesktopProspectionsTableMiniComponent
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
    OffersEmailHttpService,
    OfferPdfCommand,
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
