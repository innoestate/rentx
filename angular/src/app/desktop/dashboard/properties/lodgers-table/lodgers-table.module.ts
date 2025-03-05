import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LodgersTableAdapterService } from 'src/app/lodgers/adapters/lodgers.table.adapter';
import { LodgersCommandsService } from 'src/app/lodgers/commands/lodgers.commands.service';
import { LodgersDataModule } from 'src/app/lodgers/data/lodgers.data.module';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopLodgersTableComponent } from './lodgers-table.component';
import { LodgersCommandsModule } from 'src/app/lodgers/commands/lodgers.commands.module';



@NgModule({
  declarations: [
    DesktopLodgersTableComponent,
  ],
  imports: [
    RouterModule.forChild([{path: '', component: DesktopLodgersTableComponent}]),
    LodgersDataModule.forChild(),
    LodgersCommandsModule.forChild(),
    UiModule.forChild(),
  ],
  providers: [
    LodgersTableAdapterService,
  ]
})
export class DesktopLodgersTableModule { }
