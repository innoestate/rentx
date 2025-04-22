import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EstatesTable2AdapterService } from 'src/app/features/estates/adapters/estates.table2.adapter';
import { EstatesUiTableAdapter } from 'src/app/features/estates/adapters/table/estates.table.adapter';
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
    EstatesUiTableAdapter,
    EstatesTable2AdapterService,
    DesktopEstatesCommandsService,
  ]
})
export class EstatesModule { }
