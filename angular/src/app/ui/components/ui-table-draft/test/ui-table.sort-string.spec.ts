import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiTableColumnItem } from '../models/ui-table.column.model';
import { UiTableComponent } from '../ui-table.component';
import { columnsWithSortStringOnNameMock, NAME_COLUMN_INDEX } from './mock/columns.sort-string.mock';
import { rowsMockItems } from './mock/rows.mock';
import { cloneDeep } from 'lodash';
import { UiTableRow } from '../models/ui-table-row.model';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { UiTableHelper } from './helper/ui-table.helper';
import { UiIconService } from '../../ui-icon/service/ui-icon.service';
import { UiIconMockService } from '../../ui-icon/mocks/ui-icon.mock.service';

describe('UiTableComponent test sorting on a string column', () => {

  let rows: UiTableRow[] = cloneDeep(rowsMockItems);
  let columns: UiTableColumnItem[] = [...columnsWithSortStringOnNameMock];
  let component: UiTableComponent;
  let fixture: ComponentFixture<UiTableComponent>;
  let helper: UiTableHelper;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTableComponent],
      providers: [provideExperimentalZonelessChangeDetection(),
        {
          provide: UiIconService,
          useClass: UiIconMockService
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UiTableComponent);
    helper = new UiTableHelper(fixture);
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('columns', columns);
    component = fixture.componentInstance;
    spyOn(component.editRow, 'emit');
    fixture.detectChanges();
  });

  it('should sort the table and get the first element by ascending alphabetic order', async () => {
    expectFirstRowToBeAsInit();
    await helper.clickOnSortUp();
    expectFirstRowToBeTheSecondItem();
  });

  it('should sort the table and get the first element by descending alphabetic order ', async () => {
    expectFirstRowToBeAsInit();
    await helper.clickOnSortUp();
    fixture.detectChanges();
    await helper.clickOnSortUp();
    expectFirstRowToBeAsInit();
  });

  it('should sort the table then edit the correct row', async () => {
    expectFirstRowToBeAsInit();
    await helper.clickOnSortUp();
    expectFirstRowToBeTheSecondItem();
    updateTheFirstDisplayedRow();
    expectThatTheEditedDisplayedRowEditedTheSecondItem();
  });

  const expectFirstRowToBeAsInit = () => {
    helper.expectFirstRowCellContentToBe(NAME_COLUMN_INDEX, rows[0]?.cells['name'] as string);
  }

  const expectFirstRowToBeTheSecondItem = () => {
    helper.expectFirstRowCellContentToBe(NAME_COLUMN_INDEX, rows[1]?.cells['name'] as string);
  }

  const updateTheFirstDisplayedRow = () => {
    let nameCellFirstRowInput = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-string > input'))[0].nativeElement;
    nameCellFirstRowInput.value = 'Modified name';
    nameCellFirstRowInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.editRow.emit).toHaveBeenCalled();
  }

  const expectThatTheEditedDisplayedRowEditedTheSecondItem = () => {
    const emittedRow = (component.editRow.emit as jasmine.Spy).calls.mostRecent().args[0];
    expect(emittedRow.cells.name).toBe('Modified name');
    expect(emittedRow.data.id).toBe(rows[1].data.id);
  }

});
