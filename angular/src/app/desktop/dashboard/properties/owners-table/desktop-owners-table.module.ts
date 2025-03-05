import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OwnersTableAdapterService } from 'src/app/owners/adapters/table/owners.table.adapter';
import { OwnersCommandsModule } from 'src/app/owners/commands/owners.commands.module';
import { OwnersDataModule } from 'src/app/owners/data/owners.data.module';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopOwnersTableComponent } from './desktop-owners-table.component';

@NgModule({
  declarations: [DesktopOwnersTableComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: DesktopOwnersTableComponent }]),
    CommonModule,
    OwnersDataModule.forChild(),
    OwnersCommandsModule.forChild(),
    UiModule.forChild()
  ],
  providers: [
    OwnersTableAdapterService,
  ]
})
export class DesktopOwnersTableModule { }
