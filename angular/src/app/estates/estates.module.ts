import { NgModule } from "@angular/core";
import { CreateEstateCommand } from "./commands/create.estate.command";
import { EstatesDataModule } from "./data/estates.data.module";
import { EstatesUiTableAdapter } from "./adapters/table/estates.table.adapter";
import { EstatesTableDirective } from "./components/estates.table.directive";
import { UiModule } from "../ui/ui.module";
import { EstatesCommandsProvider } from "./commands/estates.commands.provider";
import { RentService } from "../common/services/rents.service";

@NgModule({
  imports: [
    EstatesDataModule,
    EstatesTableDirective,
    UiModule
  ],
  providers: [
    CreateEstateCommand,
    EstatesCommandsProvider,
    EstatesUiTableAdapter,
    RentService
  ],
  exports: [
    EstatesTableDirective
  ]
})
export class EstatesModule { }
