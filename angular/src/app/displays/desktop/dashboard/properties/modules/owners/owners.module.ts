import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
    DesktopOwnersCommandsService
  ]
})
export class OwnersModule { }
