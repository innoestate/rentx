import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProspectionsDataMessagesService } from 'src/app/features/prospections/data/messages/prospections.messages.service';
import { ProspectionsDataModule } from 'src/app/features/prospections/data/modules/prospections.data.module';
import { SellersCommandsService } from 'src/app/features/sellers/commands/sellers.commands.service';
import { SellersDataModule } from 'src/app/features/sellers/data/module/sellers.data.module';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopProspectionsCommandsService } from './commands/desktop.prospections.commands.service';
import { DesktopProspectionsHandlerMenuComponent } from './menu/desktop-prospections-handler-menu.component';
import { DesktopProspectionsComponent } from './prospections.component';
import { ProspectionsDesktopRoutingModule } from './prospections.routing';



@NgModule({
  declarations: [
    DesktopProspectionsComponent,
    DesktopProspectionsHandlerMenuComponent,
  ],
  imports: [
    CommonModule,
    ProspectionsDesktopRoutingModule,
    UiModule.forChild(),
    ProspectionsDataModule,
    SellersDataModule
  ],
  providers: [
    DesktopProspectionsCommandsService,
    SellersCommandsService
  ]
})
export class ProspectionsModule {
  constructor(private dataMessageService: ProspectionsDataMessagesService) {}
}
