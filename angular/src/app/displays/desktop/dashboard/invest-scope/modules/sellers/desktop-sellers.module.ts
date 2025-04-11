import { NgModule } from '@angular/core';
import { SellersTableAdapterService } from 'src/app/features/sellers/adapters/sellers.table.adapter.service';
import { SellersDataMessagesService } from 'src/app/features/sellers/data/messages/sellers.data.messages.service';
import { SellersDataModule } from 'src/app/features/sellers/data/modules/sellers.data.module';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopSellersTableComponent } from '../../components/sellers-table/desktop-sellers-table.component';
import { DesktopSellersCommandsService } from '../../commands/desktop.sellers.commands.service';



@NgModule({
  declarations: [
    DesktopSellersTableComponent
  ],
  imports: [
    UiModule.forChild(),
    SellersDataModule,
  ],
  exports: [
    DesktopSellersTableComponent,
  ],
  providers: [
    DesktopSellersCommandsService,
    SellersTableAdapterService
  ]
})
export class DesktopSellersModule {
  constructor(private dataMessageService: SellersDataMessagesService){}
}
