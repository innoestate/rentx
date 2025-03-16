import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { cloneDeep } from 'lodash';
import { UiTableRow } from '../models/ui-table-row.model';
import { UiTableColumnItem } from '../models/ui-table.column.model';
import { UiTableComponent } from '../ui-table.component';
import { UiTableHelper } from './helper/ui-table.helper';
import { columnsWithSortNumberOnNameMock, ZIP_COLUMN_INDEX } from './mock/columns.sort-number.mock';
import { rowsMockItems } from './mock/rows.mock';

describe('UiTableComponent test sorting on a number column', () => {

  let rows: UiTableRow[] = cloneDeep(rowsMockItems);
  let columns: UiTableColumnItem[] = [...columnsWithSortNumberOnNameMock];
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
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('columns', columns);
    component = fixture.componentInstance;
    spyOn(component.editRow, 'emit');
    fixture.detectChanges();
    helper = new UiTableHelper(fixture);
  });


  it('should sort the table and get the first number element by ascending order after 1 click', async () => {
    helper.expectFirstRowCellContentToBe(ZIP_COLUMN_INDEX, rows[0]?.cells['zip'] as string);
    await helper.clickOnSortUp();
    helper.expectFirstRowCellContentToBe(ZIP_COLUMN_INDEX, rows[1]?.cells['zip'] as string);
  });

  it('should sort the table and get the first number element by ascending order after 1 click', async () => {
    helper.expectFirstRowCellContentToBe(ZIP_COLUMN_INDEX, rows[0]?.cells['zip'] as string);
    await helper.clickOnSortUp();
    await helper.clickOnSortUp();
    helper.expectFirstRowCellContentToBe(ZIP_COLUMN_INDEX, rows[0]?.cells['zip'] as string);
  });

});
