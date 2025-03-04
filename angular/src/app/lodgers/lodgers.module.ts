import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadLodgers } from '../core/store/lodger/lodgers.actions';
import { UiPopupService } from '../ui/popup/services/popup.service';
import { LodgersTableAdapter } from './adapters/lodgers.table.adapter';
import { LodgersCommands } from './commands/lodgers.commands';
import { LodgersTableDirective } from './components/lodgers.table.directive';
import { LodgersDataModule } from './data/lodgers.data.module';



@NgModule({
  imports: [
    LodgersTableDirective,
    CommonModule,
    LodgersDataModule,
  ],
  providers: [
    LodgersTableAdapter,
    LodgersCommands,
    UiPopupService,
  ]
})
export class LodgersModule {
  constructor(private store: Store) {
    this.store.dispatch(loadLodgers());
  }
}
