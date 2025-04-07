import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';
import { UiTableRow } from '../models/ui-table-row.model';
import { UiTableColumnItem } from '../models/ui-table.column.model';
import { UiTableComponent } from '../ui-table.component';
import { columnsMock } from './mock/columns.mock';
import { rowsMockItems } from './mock/rows.mock';
import { UiTableHelper } from './helper/ui-table.helper';

describe('UiTableComponent test the update of a value in a cell', () => {

  let rows: UiTableRow[] = cloneDeep(rowsMockItems);
  let columns: UiTableColumnItem[] = [...columnsMock];
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
    fixture.detectChanges();
    helper = new UiTableHelper(fixture);
  });

  it('should have a value in a specific cell', () => {
    helper.expectFirstRowCellContentToBe(2, rows[0].cells['name'] as string);
  });

  it('should have a modified value in a specific cell', () => {
    rows[0].cells['name'] = 'Modified name';
    fixture.componentRef.setInput('rows', [...rows]);
    fixture.detectChanges();
    helper.expectFirstRowCellContentToBe(2, 'Modified name');
  })

});
