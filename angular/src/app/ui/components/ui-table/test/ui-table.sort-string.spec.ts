import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiTableColumnItem } from '../models/ui-table.column.model';
import { UiTableComponent } from '../ui-table.component';
import { columnsWithSortStringOnNameMock, NAME_COLUMN_INDEX } from './mock/columns.sort-string.mock';
import { rowsMockItems } from './mock/rows.mock';
import { cloneDeep } from 'lodash';


describe('UiTableComponent test sorting on a string column', () => {

  let rows: any[] = cloneDeep(rowsMockItems);
  let columns: UiTableColumnItem[] = [...columnsWithSortStringOnNameMock];
  let component: UiTableComponent<any>;
  let fixture: ComponentFixture<UiTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTableComponent);
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('columns', columns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should sort the table and get the first element by ascending alphabetic order', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"));
    let targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${NAME_COLUMN_INDEX})`));
    expect(targetedCell[0].nativeElement.textContent).toContain(rows[0].name);
    sortUpButton[0].nativeElement.click();
    tick(500);
    fixture.detectChanges();
    targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${NAME_COLUMN_INDEX})`));
    expect(targetedCell[0].nativeElement.textContent).toContain(rows[1].name);
  }));

  it('should sort the table and get the first element by descending alphabetic order', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"));
    sortUpButton[0].nativeElement.click();
    sortUpButton[0].nativeElement.click();
    tick(500);
    fixture.detectChanges();
    const targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${NAME_COLUMN_INDEX})`));
    expect(targetedCell[0].nativeElement.textContent).toContain(rows[0].name);
  }));

});
