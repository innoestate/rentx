import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopLodgersTableComponent } from '../../components/lodgers-table/desktop-lodgers-table.component';
import { LodgersCommandsService } from 'src/app/features/lodgers/commands/lodgers.commands.service';
import { DesktopLodgersCommandsService } from '../../../properties-draft/commands/deskop.lodgers.command';
import { UiModule } from 'src/app/ui/ui.module';
import { LodgersTableAdapterService } from 'src/app/features/lodgers/adapters/lodgers.table.adapter';
import { LodgersTableService } from 'src/app/features/lodgers/services/lodgers.table.directive';



@NgModule({
  declarations: [
    DesktopLodgersTableComponent
  ],
  imports: [
    CommonModule,
    UiModule.forChild()
  ],
  providers: [
    LodgersTableAdapterService,
    LodgersTableService,
    {
      provide: LodgersCommandsService,
      useClass: DesktopLodgersCommandsService
    }
  ]
})
export class LodgersModule { }
