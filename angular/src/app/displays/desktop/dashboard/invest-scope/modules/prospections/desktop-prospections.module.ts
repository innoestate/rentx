import { NgModule } from '@angular/core';
import { ProspectionsTableAdapterService } from 'src/app/features/prospections/adapters/table/prospections.table.adapter.service';
import { ProspectionsDataMessagesService } from 'src/app/features/prospections/data/messages/prospections.data.messages.service';
import { ProspectionsDataModule } from 'src/app/features/prospections/data/modules/prospections.data.module';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopProspectionsCommandsService } from '../../commands/desktop.prospections.commands.service';
import { DesktopProspectionDescriptionComponent } from '../../components/description/desktop-prospection-description.component';
import { DesktopProspectionsTableComponent } from '../../components/prospections-table/desktop-prospections-table.component';
import { ProspectionsCommandsService } from 'src/app/features/prospections/commands/prospections.commands.service';
import { ProspectionsTableService } from 'src/app/features/prospections/services/prospections.table.service';
import { InvestScopeDisplayManager } from 'src/app/features/invest-scope/displayer/invest-scope.displayer.manager';



@NgModule({
  declarations: [
    DesktopProspectionsTableComponent,
    DesktopProspectionDescriptionComponent
  ],
  imports: [
    ProspectionsDataModule,
    UiModule.forChild(),
  ],
  providers: [
    {
      provide: ProspectionsCommandsService,
      useClass: DesktopProspectionsCommandsService
    },
    ProspectionsTableAdapterService,
    ProspectionsTableService,
    InvestScopeDisplayManager
  ]
})
export class DesktopProspectionsModule {
  constructor(private dataMessageService: ProspectionsDataMessagesService){}
}
