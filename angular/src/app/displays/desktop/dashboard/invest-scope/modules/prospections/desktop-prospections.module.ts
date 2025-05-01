import { NgModule } from '@angular/core';
import { ProspectionsDataMessagesService } from 'src/app/features/prospections/data/messages/prospections.data.messages.service';
import { ProspectionsDataModule } from 'src/app/features/prospections/data/modules/prospections.data.module';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopProspectionsCommandsService } from '../../commands/desktop.prospections.commands.service';
import { DesktopProspectionDescriptionComponent } from '../../components/description/desktop-prospection-description.component';
import { DesktopProspectionsTableComponent } from '../../components/prospections-table/desktop-prospections-table.component';
import { ProspectionsCommandsService } from 'src/app/features/prospections/commands/prospections.commands.service';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';
import { ProspectionsTableAdapterService } from 'src/app/features/prospections/adapters/table/prospections.table.adapter';
import { StoreModule } from '@ngrx/store';
import { offersReducer } from 'src/app/features/offers/data/ngrx/offers.reducers';
import { OffersEffects } from 'src/app/features/offers/data/ngrx/offers.effects';
import { EffectsModule } from '@ngrx/effects';
import { OwnersModule } from '../../../properties/modules/owners/owners.module';
import { OwnersEffects } from 'src/app/features/owners/data/ngrx/owners.effects';
import { ownersReducer } from 'src/app/features/owners/data/ngrx/owners.reducers';



@NgModule({
  declarations: [
    DesktopProspectionsTableComponent,
    DesktopProspectionDescriptionComponent
  ],
  imports: [
    ProspectionsDataModule,
    UiModule.forChild(),
    StoreModule.forFeature('offers', offersReducer),
    EffectsModule.forFeature(OffersEffects),
    StoreModule.forFeature('owners', ownersReducer),
    EffectsModule.forFeature(OwnersEffects),
    OwnersModule
  ],
  providers: [
    {
      provide: ProspectionsCommandsService,
      useClass: DesktopProspectionsCommandsService
    },
    ProspectionsTableAdapterService,
    InvestScopeDisplayManager
  ]
})
export class DesktopProspectionsModule {
  constructor(private dataMessageService: ProspectionsDataMessagesService){}
}
