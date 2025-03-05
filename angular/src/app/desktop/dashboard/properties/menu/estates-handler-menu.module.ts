import { NgModule } from "@angular/core";
import { EstatesCommandsModule } from "src/app/estates/commands/estates.commands.module";
import { UiModule } from "src/app/ui/ui.module";
import { DesktopPropertiesMenuComponent } from "./estates-handler-menu.component";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";


@NgModule({
  declarations: [DesktopPropertiesMenuComponent],
  imports: [
    UiModule.forChild()
  ],
  providers: [
    UiPopupService
  ],
  exports: [DesktopPropertiesMenuComponent]
})
export class EstatesHandlerMenuModule { }
