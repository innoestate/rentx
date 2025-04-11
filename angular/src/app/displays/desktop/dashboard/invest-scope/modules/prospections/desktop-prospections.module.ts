import { NgModule } from '@angular/core';
import { ProspectionsTableAdapterService } from 'src/app/features/prospections/adapters/table/prospections.table.adapter.service';
import { ProspectionsDataMessagesService } from 'src/app/features/prospections/data/messages/prospections.data.messages.service';
import { ProspectionsDataModule } from 'src/app/features/prospections/data/modules/prospections.data.module';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopProspectionsCommandsService } from '../../commands/desktop.prospections.commands.service';
import { DesktopProspectionsTableComponent } from '../../components/prospections-table/desktop-prospections-table.component';



@NgModule({
  declarations: [
    DesktopProspectionsTableComponent
  ],
  imports: [
    ProspectionsDataModule,
    UiModule.forChild(),
  ],
  exports: [
    DesktopProspectionsTableComponent,
  ],
  providers: [
    DesktopProspectionsCommandsService,
    ProspectionsTableAdapterService
  ]
})
export class DesktopProspectionsModule {
  constructor(private dataMessageService: ProspectionsDataMessagesService){}
}
