import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UxDropdownComponent } from "../../ux-dropdown.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UxDropdownItem } from "../../model/ux-dropdown-item.model";

export const configureModule = async () => {
  await TestBed.configureTestingModule({
    imports: [BrowserAnimationsModule, UxDropdownComponent]
  })
  .compileComponents();
}

export const configureFixture = async (list: UxDropdownItem<string>[]) => {
  let fixture: ComponentFixture<UxDropdownComponent> = TestBed.createComponent(UxDropdownComponent);
  fixture.componentRef.setInput('list', list);
  fixture.componentRef.instance.writeValue('item 1');
  fixture.detectChanges();
  return fixture;
}
