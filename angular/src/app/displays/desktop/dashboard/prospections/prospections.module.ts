import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProspectionsDataMessagesService } from 'src/app/features/prospections/data/messages/prospections.data.messages.service';
import { ProspectionsDataModule } from 'src/app/features/prospections/data/modules/prospections.data.module';
import { SellersDataModule } from 'src/app/features/sellers/data/modules/sellers.data.module';
import { UiNavigatorComponent } from 'src/app/ui/components/ui-navigator/ui-navigator.component';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopProspectionsActionsComponent } from './actions/desktop-prospections-actions.component';
import { DesktopProspectionsCommandsService } from './commands/desktop.prospections.commands.service';
import { DesktopSellersCommandsService } from './commands/desktop.sellers.commands.service';
import { DesktopProspectionsNavigationComponent } from './navigation/desktop-prospections-navigation.component';
import { DesktopProspectionsComponent } from './prospections.component';
import { ProspectionsDesktopRoutingModule } from './prospections.routing';



@NgModule({
  declarations: [
    DesktopProspectionsComponent,
    DesktopProspectionsNavigationComponent,
    DesktopProspectionsActionsComponent
  ],
  imports: [
    CommonModule,
    ProspectionsDesktopRoutingModule,
    UiModule.forChild(),
    ProspectionsDataModule,
    SellersDataModule,
    UiNavigatorComponent
  ],
  providers: [
    DesktopProspectionsCommandsService,
    DesktopSellersCommandsService
  ]
})
export class ProspectionsModule {
  constructor(private dataMessageService: ProspectionsDataMessagesService) {}
}
