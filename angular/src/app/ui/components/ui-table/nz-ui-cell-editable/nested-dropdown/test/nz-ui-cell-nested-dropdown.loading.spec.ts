import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { isEqual } from "lodash";
import { columnsWithCityAsDropDownMock, LANGUAGES_COLUMN_INDEX } from "../../../test/mock/columns.dropdown.mock";
import { NzUiCellNestedDropdownComponent } from "../nz-ui-cell-nested-dropdown.component";
import { NzUiCellNestedDropdownHelper } from "./helper/nz-ui-cel-nested-dropdown.helper";

describe('NzUiCellNestedDropdownComponent unit test loading/updating a value', () => {

  let fixture: ComponentFixture<NzUiCellNestedDropdownComponent>;
  let component: NzUiCellNestedDropdownComponent;
  let list = columnsWithCityAsDropDownMock[LANGUAGES_COLUMN_INDEX -1].dropDownItems;
  let column = {
    isUiDropdownItem: list
  }
  let helper: NzUiCellNestedDropdownHelper;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzUiCellNestedDropdownComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NzUiCellNestedDropdownComponent);
    helper = new NzUiCellNestedDropdownHelper(fixture);
    fixture.componentRef.setInput('column', column);
    fixture.componentRef.setInput('value', list![0]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the correct default value in nested dropdown', () => {
    expect(isEqual(component.value(), list![0])).toBeTrue();
  })


  it('should modify style of cell when loading a value (indicating a change is waiting for confirmation from backend)', () => {

    helper.expectLoadingValueStyleToBe(false);

    helper.updateValueFromInside(list![1]);
    helper.expectLoadingValueStyleToBe(true);

    helper.updateValueFromOutside(list![1]);
    helper.expectLoadingValueStyleToBe(false);

  })

});
