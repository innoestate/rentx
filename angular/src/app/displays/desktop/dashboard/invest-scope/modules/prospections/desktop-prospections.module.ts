import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';
import { OffersDataModule } from 'src/app/features/offers/data/modules/offres.data.module';
import { OwnersEffects } from 'src/app/features/owners/data/ngrx/owners.effects';
import { ownersReducer } from 'src/app/features/owners/data/ngrx/owners.reducers';
import { ProspectionsTableAdapterService } from 'src/app/features/prospections/adapters/table/prospections.table.adapter';
import { ProspectionsCommandsService } from 'src/app/features/prospections/commands/prospections.commands.service';
import { ProspectionsDataMessagesService } from 'src/app/features/prospections/data/messages/prospections.data.messages.service';
import { ProspectionsDataModule } from 'src/app/features/prospections/data/modules/prospections.data.module';
import { UiModule } from 'src/app/ui/ui.module';
import { OwnersModule } from '../../../properties/modules/owners/owners.module';
import { DesktopProspectionsCommandsService } from '../../commands/desktop.prospections.commands.service';
import { DesktopProspectionDescriptionComponent } from '../../components/description/desktop-prospection-description.component';
import { DesktopProspectionsTableComponent } from '../../components/prospections-table/desktop-prospections-table.component';
import { OfferDownloadCompleteDataCommand } from 'src/app/features/offers/commands/offer.complete-data.command';



@NgModule({
  declarations: [
    DesktopProspectionsTableComponent,
    DesktopProspectionDescriptionComponent
  ],
  imports: [
    ProspectionsDataModule,
    UiModule.forChild(),
    OffersDataModule,
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
    InvestScopeDisplayManager,
    OfferDownloadCompleteDataCommand
  ]
})
export class DesktopProspectionsModule {
  constructor(private dataMessageService: ProspectionsDataMessagesService){}
}
