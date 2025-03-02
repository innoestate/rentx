import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiTableColumnItem } from '../models/ui-table.column.model';
import { UiTableComponent } from '../ui-table.component';
import { rowsMockItems } from './mock/rows.mock';
import { cloneDeep } from 'lodash';
import { columnsWithSortNumberOnNameMock, ZIP_COLUMN_INDEX } from './mock/columns.sort-number.mock';


describe('UiTableComponent test sorting on a number column', () => {

  let rows: any[] = cloneDeep(rowsMockItems);
  let columns: UiTableColumnItem[] = [...columnsWithSortNumberOnNameMock];
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

  it('should sort the table and get the first number element by ascending order after 1 click', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"))[0];
    const targetedCellB = fixture.debugElement.queryAll(By.css(`body td:nth-child(${ZIP_COLUMN_INDEX})`))[0].nativeElement;
    expect(targetedCellB.textContent).toContain(rows[0].zip.toString());
    sortUpButton.nativeElement.click();
    tick(500);
    fixture.detectChanges();
    const targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${ZIP_COLUMN_INDEX})`))[0].nativeElement;
    expect(targetedCell.textContent).toContain(rows[0].zip.toString());
  }));


  it('should sort the table and get the first number element by descending order after 2 click', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"))[0];
    sortUpButton.nativeElement.click();
    sortUpButton.nativeElement.click();
    tick(500);
    fixture.detectChanges();
    const targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${ZIP_COLUMN_INDEX})`))[0].nativeElement;
    expect(targetedCell.textContent).toContain(rows[1].zip.toString());
  }));

  it('should sort the table and get the first number element by ascending order after 3 click', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"))[0];
    sortUpButton.nativeElement.click();
    sortUpButton.nativeElement.click();
    sortUpButton.nativeElement.click();
    tick(500);
    fixture.detectChanges();
    const targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${ZIP_COLUMN_INDEX})`))[0].nativeElement;
    expect(targetedCell.textContent).toContain(rows[0].zip.toString());
  }));

});
