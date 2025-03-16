import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NzModalModule } from "ng-zorro-antd/modal";

export const configureModule = () => {
  TestBed.configureTestingModule({
    imports: [
      BrowserAnimationsModule,
      NzModalModule
    ],
    providers: [
      provideExperimentalZonelessChangeDetection()
    ]
  });
}
