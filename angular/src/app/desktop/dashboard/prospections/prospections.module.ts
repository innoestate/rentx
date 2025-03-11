import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopProspectionsComponent } from './prospections.component';
import { ProspectionsDesktopRoutingModule } from './prospections.routing';
import { DesktopProspectionsHandlerMenuComponent } from './menu/desktop-prospections-handler-menu.component';
import { UiModule } from 'src/app/ui/ui.module';
import { ProspectionsDataModule } from 'src/app/prospections/data/module/prospections.data.module';
import { ProspectionsDataMessagesService } from 'src/app/prospections/data/messages/prospections.messages.service';
import { SellersDataModule } from 'src/app/sellers/data/module/sellers.data.module';



@NgModule({
  declarations: [
    DesktopProspectionsComponent,
    DesktopProspectionsHandlerMenuComponent,
  ],
  imports: [
    CommonModule,
    ProspectionsDesktopRoutingModule,
    UiModule,
    ProspectionsDataModule,
    SellersDataModule
  ]
})
export class ProspectionsModule {
  constructor(private dataMessageService: ProspectionsDataMessagesService) {}
}
