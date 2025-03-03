import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiTableColumnItem } from '../models/ui-table.column.model';
import { UiTableComponent } from '../ui-table.component';
import { columnsWithSortStringOnNameMock, NAME_COLUMN_INDEX } from './mock/columns.sort-string.mock';
import { rowsMockItems } from './mock/rows.mock';
import { cloneDeep } from 'lodash';
import { UiTableRow } from '../models/ui-table-row.model';


describe('UiTableComponent test sorting on a string column', () => {

  let rows: UiTableRow[] = cloneDeep(rowsMockItems);
  let columns: UiTableColumnItem[] = [...columnsWithSortStringOnNameMock];
  let component: UiTableComponent;
  let fixture: ComponentFixture<UiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTableComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTableComponent);
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('columns', columns);
    component = fixture.componentInstance;
    spyOn(component.editRow, 'emit');
    fixture.detectChanges();
  });

  it('should sort the table and get the first element by ascending alphabetic order', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"));
    let targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${NAME_COLUMN_INDEX})`));
    expect(targetedCell[0].nativeElement.textContent).toContain(rows[0].cells['name']);
    sortUpButton[0].nativeElement.click();
    tick(500);
    fixture.detectChanges();
    targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${NAME_COLUMN_INDEX})`));
    expect(targetedCell[0].nativeElement.textContent).toContain(rows[1].cells['name']);
  }));

  it('should sort the table and get the first element by descending alphabetic order', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"));
    sortUpButton[0].nativeElement.click();
    sortUpButton[0].nativeElement.click();
    tick(500);
    fixture.detectChanges();
    const targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${NAME_COLUMN_INDEX})`));
    expect(targetedCell[0].nativeElement.textContent).toContain(rows[0].cells['name']);
  }));

  it('should sort the table then edit the correct row', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"));

    const row0 = cloneDeep(rows[0]);
    const row1 = cloneDeep(rows[1]);

    let nameCellOfFirstRow = fixture.debugElement.queryAll(By.css(`body td:nth-child(${NAME_COLUMN_INDEX})`))[0].nativeElement;
    expect(nameCellOfFirstRow.textContent).toContain(row0.cells['name']);

    sortUpButton[0].nativeElement.click();
    tick(500);
    fixture.detectChanges();

    let nameCellOfSecondRow = fixture.debugElement.queryAll(By.css(`body td:nth-child(${NAME_COLUMN_INDEX})`))[1].nativeElement;
    expect(nameCellOfSecondRow.textContent).toContain(row0.cells['name']);
    let nameCellFirstRowInput = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-string > input'))[0].nativeElement;
    expect(nameCellFirstRowInput.value).toContain(row1.cells['name']);

    //we reversed the rows.
    //the first original row is now in the second row in nz-table

    nameCellFirstRowInput.value = 'Modified name';
    nameCellFirstRowInput.dispatchEvent(new Event('change'));
    tick(500);
    fixture.detectChanges();

    //we update the first row name value.
    //So we need that the second row displayed after sorting be modified.

    expect(component.editRow.emit).toHaveBeenCalled();

    const emittedRow = (component.editRow.emit as jasmine.Spy).calls.mostRecent().args[0];
    expect(emittedRow.cells.name).toBe('Modified name');
    expect(emittedRow.data.id).toBe(row1.data.id);


  }));

});
