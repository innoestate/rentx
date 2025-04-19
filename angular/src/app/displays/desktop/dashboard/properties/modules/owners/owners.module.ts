import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopOwnersTableComponent } from '../../components/owners-table/desktop-owners-table.component';
import { OwnersTableService } from 'src/app/features/owners/services/owners.table.service';
import { OwnersCommandsService } from 'src/app/features/owners/commands/owners.command.service';
import { DesktopOwnersCommandsService } from '../../../properties-draft/commands/desktop.owners.command';
import { OwnersTableAdapterService } from 'src/app/features/owners/adapters/table/owners.table.adapter';
import { UiModule } from 'src/app/ui/ui.module';



@NgModule({
  declarations: [
    DesktopOwnersTableComponent
  ],
  imports: [
    CommonModule,
    UiModule.forChild()
  ],
  providers: [
    OwnersTableService,
    OwnersTableAdapterService,
    {
      provide: OwnersCommandsService,
      useClass: DesktopOwnersCommandsService
    }
  ]
})
export class OwnersModule { }
