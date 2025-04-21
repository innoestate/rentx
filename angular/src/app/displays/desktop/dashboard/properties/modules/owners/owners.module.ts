import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OwnersTableAdapterService } from 'src/app/features/owners/adapters/table/owners.table.adapter';
import { OwnersTableService } from 'src/app/features/owners/services/owners.table.service';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopOwnersCommandsService } from '../../commands/desktop.owners.command';
import { DesktopOwnersTableComponent } from '../../components/owners-table/desktop-owners-table.component';



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
    DesktopOwnersCommandsService
  ]
})
export class OwnersModule { }
