import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { cloneDeep } from 'lodash';
import { UiDropdownItem } from '../../ui-dropdown/model/ui-dropdown-item.model';
import { UiTableRow } from '../models/ui-table-row.model';
import { UiTableColumnItem } from '../models/ui-table.column.model';
import { UiTableComponent } from '../ui-table.component';
import { UiTableHelper } from './helper/ui-table.helper';
import { columnsWithCityAsDropDownMock, LANGUAGES_COLUMN_INDEX } from './mock/columns.dropdown.mock';
import { rowsMockItems } from './mock/rows.mock';


describe('UiTableComponent test sorting on a dropdown column', () => {

  let rows: UiTableRow[] = cloneDeep(rowsMockItems);
  let columns: UiTableColumnItem[] = [...columnsWithCityAsDropDownMock];
  let component: UiTableComponent;
  let fixture: ComponentFixture<UiTableComponent>;
  let helper: UiTableHelper;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTableComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UiTableComponent);
    helper = new UiTableHelper(fixture);
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('columns', columns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should sort the table and get the first element by ascending alphabetic order', async() => {
    helper.expectFirstRowCellContentToBe(LANGUAGES_COLUMN_INDEX, (rows[0].cells['language'] as UiDropdownItem<any>).label);
    await helper.clickOnSortUp();
    helper.expectFirstRowCellContentToBe(LANGUAGES_COLUMN_INDEX, (rows[1].cells['language'] as UiDropdownItem<any>).label);
  })

  it('should sort the table and get the first element by descending alphabetic order', async() => {
    helper.expectFirstRowCellContentToBe(LANGUAGES_COLUMN_INDEX, (rows[0].cells['language'] as UiDropdownItem<any>).label);
    await helper.clickOnSortUp();
    await helper.clickOnSortUp();
    helper.expectFirstRowCellContentToBe(LANGUAGES_COLUMN_INDEX, (rows[0].cells['language'] as UiDropdownItem<any>).label);
  })

});
