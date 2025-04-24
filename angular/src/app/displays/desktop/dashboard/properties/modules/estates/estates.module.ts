import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopEstatesCommandsService } from '../../commands/desktop.estates.command';
import { DesktopEstatesTableComponent } from '../../components/estates-table/desktop-estates-table.component';



@NgModule({
  declarations: [
    DesktopEstatesTableComponent
  ],
  imports: [
    CommonModule,
    UiModule.forChild()
  ],
  providers: [
    DesktopEstatesCommandsService,
  ]
})
export class EstatesModule { }
