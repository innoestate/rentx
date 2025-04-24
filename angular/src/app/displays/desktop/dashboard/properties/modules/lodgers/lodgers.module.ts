import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopLodgersCommandsService } from '../../commands/deskop.lodgers.command';
import { DesktopLodgersTableComponent } from '../../components/lodgers-table/desktop-lodgers-table.component';



@NgModule({
  declarations: [
    DesktopLodgersTableComponent
  ],
  imports: [
    CommonModule,
    UiModule.forChild()
  ],
  providers: [
    DesktopLodgersCommandsService
  ]
})
export class LodgersModule { }
