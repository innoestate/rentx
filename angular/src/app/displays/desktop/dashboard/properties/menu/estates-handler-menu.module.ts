import { NgModule } from "@angular/core";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { UiModule } from "src/app/ui/ui.module";
import { DesktopPropertiesMenuComponent } from "./estates-handler-menu.component";


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
