import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { isEqual } from "lodash";
import { columnsWithCityAsDropDownMock, LANGUAGES_COLUMN_INDEX } from "../../../test/mock/columns.dropdown.mock";
import { NzUiCellNestedDropdownComponent } from "../nz-ui-cell-nested-dropdown.component";

describe('NzUiCellNestedDropdownComponent unit test', () => {

  let fixture: ComponentFixture<NzUiCellNestedDropdownComponent>;
  let component: NzUiCellNestedDropdownComponent;
  let list = columnsWithCityAsDropDownMock[LANGUAGES_COLUMN_INDEX -1].dropDownItems;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzUiCellNestedDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzUiCellNestedDropdownComponent);
    fixture.componentRef.setInput('list', list);
    fixture.componentRef.setInput('value', list![0]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should have a specific class when loading value', fakeAsync(() => {

    expect(isEqual(component.value(), list![0])).toBeTrue();
    let clickableElement = fixture.debugElement.query(By.css('.clickable')).nativeElement;
    expect(clickableElement.classList.contains('loading-value')).toBeFalsy();

    fixture.componentInstance.editNestedDropdown(list![1]);

    tick(500);
    fixture.detectChanges();
    expect(clickableElement.classList.contains('loading-value')).toBeTruthy();

    fixture.componentRef.setInput('value', list![1]);
    tick(500);
    fixture.detectChanges();
    expect(isEqual(component.value(), list![1])).toBeTrue();
    expect(clickableElement.classList.contains('loading-value')).toBeFalsy();

  }))

});
