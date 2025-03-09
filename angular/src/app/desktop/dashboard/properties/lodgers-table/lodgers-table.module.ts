import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LodgersTableAdapterService } from 'src/app/lodgers/adapters/lodgers.table.adapter';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopLodgersTableComponent } from './lodgers-table.component';



@NgModule({
  declarations: [
    DesktopLodgersTableComponent,
  ],
  imports: [
    RouterModule.forChild([{path: '', component: DesktopLodgersTableComponent}]),
    // LodgersDataModule.forChild(),
    // LodgersCommandsModule.forChild(),
    UiModule.forChild(),
  ],
  providers: [
    LodgersTableAdapterService,
  ]
})
export class DesktopLodgersTableModule { }
