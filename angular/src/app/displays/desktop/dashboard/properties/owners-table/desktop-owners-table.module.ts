import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OwnersTableAdapterService } from 'src/app/features/owners/adapters/table/owners.table.adapter';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopOwnersTableComponent } from './desktop-owners-table.component';
import { OwnersDataService } from 'src/app/features/owners/data/owners.data.service';
import { DesktopOwnersCommandsService } from '../commands/desktop.owners.command';

@NgModule({
  declarations: [DesktopOwnersTableComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: DesktopOwnersTableComponent }]),
    CommonModule,
    UiModule.forChild()
  ],
  providers: [
    OwnersTableAdapterService,
    DesktopOwnersCommandsService
  ]
})
export class DesktopOwnersTableModule {
  constructor(private ownersDataService: OwnersDataService){
    this.ownersDataService.loadOwners();
  }
}
