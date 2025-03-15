import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { isEqual } from "lodash";
import { columnsWithCityAsDropDownMock, LANGUAGES_COLUMN_INDEX } from "../../../test/mock/columns.dropdown.mock";
import { NzUiCellNestedDropdownComponent } from "../nz-ui-cell-nested-dropdown.component";

describe('NzUiCellNestedDropdownComponent unit test loading/updating a value', () => {

  let fixture: ComponentFixture<NzUiCellNestedDropdownComponent>;
  let component: NzUiCellNestedDropdownComponent;
  let list = columnsWithCityAsDropDownMock[LANGUAGES_COLUMN_INDEX -1].dropDownItems;
  let column = {
    isUiDropdownItem: list
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzUiCellNestedDropdownComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzUiCellNestedDropdownComponent);
    fixture.componentRef.setInput('column', column);
    fixture.componentRef.setInput('value', list![0]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the correct default value in nested dropdown', () => {
    expect(isEqual(component.value(), list![0])).toBeTrue();
  })


  it('should modify style of cell when loading a value (indicating a change is waiting for confirmation from backend)', () => {

    expectLoadingValueStyleToBe(false);

    updateSelectedItemFromInside(1);
    expectLoadingValueStyleToBe(true);

    updateSelectedItemFromOutside(1);
    expectLoadingValueStyleToBe(false);

  })

  const expectLoadingValueStyleToBe = (loading: boolean ) => {
    let clickableElement = fixture.debugElement.query(By.css('.clickable')).nativeElement;
    expect(clickableElement.classList.contains('loading-value')).toEqual(loading);
  }

  const updateSelectedItemFromInside = (index: number) => {
    fixture.componentInstance.editNestedDropdown(list![index]);
    fixture.detectChanges();
  }

  const updateSelectedItemFromOutside = (index: number) => {
    fixture.componentRef.setInput('value', list![index]);
    fixture.detectChanges();
  }

});
