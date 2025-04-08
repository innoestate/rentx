import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProspectionsDataMessagesService } from 'src/app/features/prospections/data/messages/prospections.data.messages.service';
import { ProspectionsDataModule } from 'src/app/features/prospections/data/modules/prospections.data.module';
import { SellersCommandsService } from 'src/app/features/sellers/commands/table/sellers.commands.service';
import { SellersDataModule } from 'src/app/features/sellers/data/modules/sellers.data.module';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopProspectionsCommandsService } from './commands/desktop.prospections.commands.service';
import { DesktopProspectionsHandlerMenuComponent } from './menu/desktop-prospections-handler-menu.component';
import { DesktopProspectionsComponent } from './prospections.component';
import { ProspectionsDesktopRoutingModule } from './prospections.routing';
import { DesktopSellersCommandsService } from './commands/desktop.sellers.commands.service';
import { DesktopProspectionsNavigationComponent } from './navigation/desktop-prospections-navigation.component';



@NgModule({
  declarations: [
    DesktopProspectionsComponent,
    DesktopProspectionsHandlerMenuComponent,
    DesktopProspectionsNavigationComponent,
  ],
  imports: [
    CommonModule,
    ProspectionsDesktopRoutingModule,
    UiModule.forChild(),
    ProspectionsDataModule,
    SellersDataModule,
  ],
  providers: [
    DesktopProspectionsCommandsService,
    DesktopSellersCommandsService
  ]
})
export class ProspectionsModule {
  constructor(private dataMessageService: ProspectionsDataMessagesService) {}
}
