import { NgModule } from "@angular/core";
import { CreateEstateCommand } from "./commands/create.estate.command";
import { EstatesDataModule } from "./data/estates.data.module";
import { EstatesUiTableAdapter } from "./adapters/table/estates.table.adapter";
import { EstatesTableDirective } from "./components/estates.table.directive";
import { UxModule } from "../ux/ux.module";
import { EstatesCommandsProvider } from "./commands/estates.commands.provider";

@NgModule({
  imports: [
    EstatesDataModule,
    EstatesTableDirective,
    UxModule
  ],
  providers: [
    CreateEstateCommand,
    EstatesCommandsProvider,
    EstatesUiTableAdapter
  ],
  exports: [
    EstatesTableDirective
  ]
})
export class EstatesModule { }
