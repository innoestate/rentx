import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstatesUiTableAdapter } from 'src/app/features/estates/adapters/table/estates.table.adapter.service';
import { UiModule } from 'src/app/ui/ui.module';
import { EstatesTableComponent } from './estates-table.component';
import { DesktopEstatesCommandsService } from '../commands/desktop.estates.command';



@NgModule({
  declarations: [EstatesTableComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: EstatesTableComponent }]),
    CommonModule,

    UiModule.forChild(),

  ],
  providers: [
    EstatesUiTableAdapter,
    DesktopEstatesCommandsService
  ]
})
export class EstatesTableModule {

  constructor() {
    // console.log('estate table module constructor');
  }

}
