import { NgModule } from '@angular/core';
import { ProspectionsTableAdapterService } from 'src/app/features/prospections/adapters/table/prospections.table.adapter.service';
import { ProspectionsDataMessagesService } from 'src/app/features/prospections/data/messages/prospections.data.messages.service';
import { ProspectionsDataModule } from 'src/app/features/prospections/data/modules/prospections.data.module';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopProspectionsCommandsService } from '../../commands/desktop.prospections.commands.service';
import { DesktopProspectionsTableComponent } from '../../components/prospections-table/desktop-prospections-table.component';
import { DesktopProspectionDescriptionComponent } from '../../components/description/desktop-prospection-description.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DesktopProspectionsTableComponent,
    DesktopProspectionDescriptionComponent
  ],
  imports: [
    CommonModule,
    ProspectionsDataModule,
    UiModule.forChild(),
  ],
  exports: [
    DesktopProspectionsTableComponent,
    DesktopProspectionDescriptionComponent
  ],
  providers: [
    DesktopProspectionsCommandsService,
    ProspectionsTableAdapterService
  ]
})
export class DesktopProspectionsModule {
  constructor(private dataMessageService: ProspectionsDataMessagesService){}
}
