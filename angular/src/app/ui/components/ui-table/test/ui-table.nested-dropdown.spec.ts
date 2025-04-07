import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cloneDeep } from 'lodash';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UiDropdownComponent } from '../../ui-dropdown/ui-dropdown.component';
import { UiTableColumnItem } from '../models/ui-table.column.model';
import { UiTableComponent } from '../ui-table.component';
import { columnsWithCityAsDropDownMock } from './mock/columns.dropdown.mock';
import { RowMock, rowsMockItems } from './mock/rows.mock';

describe('UiTableComponent test a dropdown in a cell', () => {

  let rows: RowMock[] = cloneDeep(rowsMockItems);
  let columns: UiTableColumnItem[] = [...columnsWithCityAsDropDownMock];
  let component: UiTableComponent;
  let fixture: ComponentFixture<UiTableComponent>;
  const LANGUAGES_COLUMN_INDEX = 5;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTableComponent, UiDropdownComponent, FormsModule, NzSelectModule, BrowserAnimationsModule],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTableComponent);
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('columns', columns);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.editRow, 'emit');
    spyOn(component, 'startEdit');
    spyOn(component, 'edit');
  });

  it('should call start edit dropdown', () => {
    clickOnDropdown();
    expect(component.startEdit).toHaveBeenCalled();
  })

  it('should have the first item selected', () => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-nested-dropdown > .clickable'))[0].nativeElement;
    expect(cellToEdit.textContent).toContain(columns[LANGUAGES_COLUMN_INDEX]?.dropdown?.list?.[0]?.label);
  })

  it('should select an item from the dropdown', async () => {
    clickOnDropdown();
    await clickOnDropdownItem(1);
    expectItemToBeSelected(1);
  })

  it('should select an item from the dropdown', async () => {
    clickOnDropdown();
    await clickOnDropdownItem(1);
    expectItemToBeSelected(1);
  })

  const expectItemToBeSelected = (index = 0) => {
    const cellToEdit = fixture.debugElement.query(By.css('nz-ui-cell-nested-dropdown > .clickable')).nativeElement;
    expect(cellToEdit.textContent).toContain(columns[LANGUAGES_COLUMN_INDEX]?.dropdown?.list?.[index]?.label);
    expect(component.edit).toHaveBeenCalled();
  }

  const clickOnDropdown = () => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-nested-dropdown > .clickable'))[0].nativeElement;
    cellToEdit.click();
  }

  const clickOnDropdownItem = async (index = 0) => {
    const dropdownItem = await dropdownItemIsOpen(index);
    dropdownItem.click();
    fixture.detectChanges();
  }

  const dropdownItemIsOpen = (index = 0): Promise<HTMLDivElement> => {
    return new Promise(resolve => {
      const observer = new MutationObserver(() => {
        let dropdownItem = document.querySelectorAll('[test-selector="ui-nested-dropdown-item"]')[index] as HTMLDivElement;
        if (dropdownItem) {
          resolve(dropdownItem)
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

});
