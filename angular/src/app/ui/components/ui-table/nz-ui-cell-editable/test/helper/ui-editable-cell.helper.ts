import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NzUxCellEditableComponent } from "../../nz-ui-cell-editable.directive";
import { UiItem } from "src/app/ui/models/ui-item.model";

export class NzUiCellEditableHelper {

  constructor(protected fixture: ComponentFixture<NzUxCellEditableComponent>) {}

  expectLoadingValueStyleToBe = (loading: boolean ) => {
    let clickableElement = this.fixture.debugElement.query(By.css('.clickable')).nativeElement;
    expect(clickableElement.classList.contains('loading-value')).toEqual(loading);
  }

  updateValueFromInside(value: string | number | UiItem){
    const input = this.fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('change'));
    this.fixture.detectChanges();
  }

  updateValueFromOutside(value: string | number | UiItem){
    this.fixture.componentRef.setInput('value', value);
    this.fixture.detectChanges();
  }

}