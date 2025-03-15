import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UiDropdownComponent } from "../../ui-dropdown.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UiDropdownItem } from "../../model/ui-dropdown-item.model";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";

export const configureModule = async () => {
  await TestBed.configureTestingModule({
    imports: [BrowserAnimationsModule, UiDropdownComponent],
    providers: [provideExperimentalZonelessChangeDetection()]
  })
  .compileComponents();
}

export const configureFixture = async (list: UiDropdownItem<string>[]) => {
  let fixture: ComponentFixture<UiDropdownComponent> = TestBed.createComponent(UiDropdownComponent);
  fixture.componentRef.setInput('list', list);
  fixture.componentRef.instance.writeValue('item 1');
  fixture.detectChanges();
  return fixture;
}
