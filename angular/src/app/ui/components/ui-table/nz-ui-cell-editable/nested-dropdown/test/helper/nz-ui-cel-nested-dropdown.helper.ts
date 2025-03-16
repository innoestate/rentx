import { ComponentFixture } from "@angular/core/testing";
import { NzUiCellEditableHelper } from "../../../test/helper/ui-editable-cell.helper";
import { NzUiCellNestedDropdownComponent } from "../../nz-ui-cell-nested-dropdown.component";

export class NzUiCellNestedDropdownHelper extends NzUiCellEditableHelper {

  override fixture: ComponentFixture<NzUiCellNestedDropdownComponent>;

  constructor(fixture: ComponentFixture<NzUiCellNestedDropdownComponent>){
    super(fixture);
    this.fixture = fixture;
  }

  override updateValueFromInside(value: any){
    this.fixture.componentInstance.editNestedDropdown(value);
    this.fixture.detectChanges();
  }

  override updateValueFromOutside(value: any){
    this.fixture.componentRef.setInput('value', value);
    this.fixture.detectChanges();
  }

}