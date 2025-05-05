import { NgModule } from '@angular/core';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';
import { OfferDownloadCompleteDataCommand } from 'src/app/features/offers/commands/offer.complete-data.command';
import { OffersDataModule } from 'src/app/features/offers/modules/offres.data.module';
import { OwnersDataModule } from 'src/app/features/owners/data/owners.data.module';
import { ProspectionsTableAdapterService } from 'src/app/features/prospections/adapters/table/prospections.table.adapter';
import { ProspectionsCommandsService } from 'src/app/features/prospections/commands/prospections.commands.service';
import { ProspectionsDataMessagesService } from 'src/app/features/prospections/data/messages/prospections.data.messages.service';
import { ProspectionsDataModule } from 'src/app/features/prospections/data/modules/prospections.data.module';
import { UiModule } from 'src/app/ui/ui.module';
import { OwnersModule } from '../../../properties/modules/owners/owners.module';
import { DesktopProspectionsCommandsService } from '../../commands/desktop.prospections.commands.service';
import { DesktopProspectionDescriptionComponent } from '../../components/description/desktop-prospection-description.component';
import { DesktopProspectionsTableComponent } from '../../components/prospections-table/desktop-prospections-table.component';



@NgModule({
  declarations: [
    DesktopProspectionsTableComponent,
    DesktopProspectionDescriptionComponent
  ],
  imports: [
    ProspectionsDataModule,
    UiModule.forChild(),
    OffersDataModule,
    OwnersDataModule,
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
