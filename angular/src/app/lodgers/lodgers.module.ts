import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadLodgers } from '../core/store/lodger/lodgers.actions';
import { UiPopupService } from '../ui/popup/services/popup.service';
import { LodgersTableAdapterService } from './adapters/lodgers.table.adapter';
import { LodgersCommandsService } from './commands/lodgers.commands.service';
import { LodgersTableDirective } from './components/lodgers.table.directive';
import { LodgersDataModule } from './data/lodgers.data.module';



@NgModule({
  imports: [
    LodgersTableDirective,
    CommonModule,
    LodgersDataModule,
  ],
  providers: [
    LodgersTableAdapterService,
    LodgersCommandsService,
    UiPopupService,
  ]
})
export class LodgersModule {}
