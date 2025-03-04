import { NgModule } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadOwners } from "../core/store/owner/owners.actions";
import { UiModule } from "../ui/ui.module";
import { OwnersTableAdapter } from "./adapters/table/owners.table.adapter";
import { OwnersCommands } from "./commands/owners.command";
import { OwnersTableDirective } from "./components/owners.table.directive";
import { OwnersDataModule } from "./data/owners.data.module";
import { UiPopupService } from "../ui/popup/services/popup.service";

@NgModule({
  imports: [
    OwnersDataModule,
    OwnersTableDirective,
    UiModule
  ],
  providers: [
    OwnersCommands,
    OwnersTableAdapter,
    UiPopupService
  ]
})
export class OwnersModule {
  constructor(private store: Store) {
    this.store.dispatch(loadOwners());
  }
}
