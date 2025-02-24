import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UxTableColumnItem } from '../models/ux-table.column.model';
import { UxTableComponent } from '../ux-table.component';
import { rowsMockItems } from './mock/rows.mock';
import { cloneDeep } from 'lodash';
import { columnsWithSortNumberOnNameMock } from './mock/columns.sort-number.mock';


describe('UxTableComponent test sorting on a number column', () => {

  let rows: any[] = cloneDeep(rowsMockItems);
  let columns: UxTableColumnItem[] = [...columnsWithSortNumberOnNameMock];
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

  it('should sort the table and get the first number element by ascending', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"));
    console.log('sortUpButton', sortUpButton);
    let targetedCell = fixture.debugElement.queryAll(By.css("body td:nth-child(5)"));
    expect(targetedCell[0].nativeElement.textContent).toContain(rows[0].zip.toString());
    sortUpButton[0].nativeElement.click();
    tick(500);
    fixture.detectChanges();
    targetedCell = fixture.debugElement.queryAll(By.css("body td:nth-child(4)"));
    expect(targetedCell[0].nativeElement.textContent).toContain(rows[1].zip.toString());
  }));

  it('should sort the table and get the first number element by descending order', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"));
    sortUpButton[0].nativeElement.click();
    sortUpButton[0].nativeElement.click();
    tick(500);
    fixture.detectChanges();
    const targetedCell = fixture.debugElement.queryAll(By.css("body td:nth-child(5)"));
    expect(targetedCell[0].nativeElement.textContent).toContain(rows[1].zip.toString());
  }));

});
