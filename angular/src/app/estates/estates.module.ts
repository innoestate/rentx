import { NgModule } from "@angular/core";
import { EstatesDataModule } from "./data/estates.data.module";
import { EstatesUiTableAdapter } from "./adapters/table/estates.table.adapter";
import { EstatesTableDirective } from "./components/estates.table.directive";
import { UiModule } from "../ui/ui.module";
import { EstatesCommandsProvider } from "./commands/estates.commands.provider";
import { RentService } from "../common/services/rents.service";
import { OwnersCommands } from "../owners/commands/owners.command";
import { UiPopupService } from "../ui/popup/services/popup.service";

@NgModule({
  imports: [
    EstatesDataModule,
    EstatesTableDirective,
    UiModule
  ],
  providers: [
    EstatesCommandsProvider,
    EstatesUiTableAdapter,
    RentService,
    OwnersCommands,
    UiPopupService
  ],
  exports: [
    EstatesTableDirective,
  ]
})
export class EstatesModule { }
