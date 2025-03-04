import { NgModule } from "@angular/core";
import { UiModule } from "../ui/ui.module";
import { OwnersDataModule } from "./data/owners.data.module";

@NgModule({
  imports: [
    OwnersDataModule,
    UiModule
  ]
})
export class OwnersModule { }
