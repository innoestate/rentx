import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UxTableColumnItem } from '../models/ux-table.column.model';
import { UxTableComponent } from '../ux-table.component';
import { columnsWithSortStringOnNameMock } from './mock/columns.sort-string.mock';
import { rowsMockItems } from './mock/rows.mock';
import { cloneDeep } from 'lodash';


describe('UxTableComponent test sorting on a string column', () => {

  let rows: any[] = cloneDeep(rowsMockItems);
  let columns: UxTableColumnItem[] = [...columnsWithSortStringOnNameMock];
  let component: UxTableComponent<any>;
  let fixture: ComponentFixture<UxTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UxTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UxTableComponent);
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('columns', columns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should sort the table and get the first element by ascending alphabetic order', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"));
    sortUpButton[0].nativeElement.click();
    tick(500);
    fixture.detectChanges();
    const targetedCell = fixture.debugElement.queryAll(By.css("body td:nth-child(2)"));
    expect(targetedCell[0].nativeElement.textContent).toContain(rows[1].name);
  }));

  it('should sort the table and get the first element by descending alphabetic order', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"));
    sortUpButton[0].nativeElement.click();
    sortUpButton[0].nativeElement.click();
    tick(500);
    fixture.detectChanges();
    const targetedCell = fixture.debugElement.queryAll(By.css("body td:nth-child(2)"));
    expect(targetedCell[0].nativeElement.textContent).toContain(rows[0].name);
  }));

});
