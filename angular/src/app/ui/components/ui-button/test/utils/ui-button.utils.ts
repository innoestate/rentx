import { TestBed } from "@angular/core/testing";
import { UiButtonComponent } from "../../ui-button.component";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";

export const configureModule = async () => {
  await TestBed.configureTestingModule({
    imports: [UiButtonComponent],
    providers: [provideExperimentalZonelessChangeDetection()]
  })
  .compileComponents();
}