import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopEstatesTableComponent } from '../../components/estates-table/desktop-estates-table.component';
import { UiModule } from 'src/app/ui/ui.module';
import { EstatesTableService } from 'src/app/features/estates/services/estates.table.service';
import { EstatesUiTableAdapter } from 'src/app/features/estates/adapters/table/estates.table.adapter.service';
import { EstatesCommandsService } from 'src/app/features/estates/commands/estates.commands.service';
import { DesktopEstatesCommandsService } from '../../../properties-draft/commands/desktop.estates.command';



@NgModule({
  declarations: [
    DesktopEstatesTableComponent
  ],
  imports: [
    CommonModule,
    UiModule.forChild()
  ],
  providers: [
    EstatesTableService,
    EstatesUiTableAdapter,
    {
      provide: EstatesCommandsService,
      useClass: DesktopEstatesCommandsService
    }
  ]
})
export class EstatesModule { }
