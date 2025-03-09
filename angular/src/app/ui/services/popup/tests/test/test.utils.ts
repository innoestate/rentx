import { TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NzModalModule } from "ng-zorro-antd/modal";
import { DevPopupService } from "../../dev.popup.service";

export const configureModule = () => {
  TestBed.configureTestingModule({
    imports: [
      BrowserAnimationsModule,
      NzModalModule
    ],
    providers: [
      DevPopupService
    ]
  });
}
