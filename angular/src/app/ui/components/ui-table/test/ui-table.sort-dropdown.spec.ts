import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';
import { UiTableColumnItem } from '../models/ui-table.column.model';
import { UiTableComponent } from '../ui-table.component';
import { columnsWithCityAsDropDownMock, LANGUAGES_COLUMN_INDEX } from './mock/columns.dropdown.mock';
import { rowsMockItems } from './mock/rows.mock';


describe('UiTableComponent test sorting on a dropdown column', () => {

  let rows: any[] = cloneDeep(rowsMockItems);
  let columns: UiTableColumnItem[] = [...columnsWithCityAsDropDownMock];
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
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"))[0];
    let targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${LANGUAGES_COLUMN_INDEX})`))[0].nativeElement;
    expect(targetedCell.textContent).toContain(rows[0].language.label);
    sortUpButton.nativeElement.click();
    tick(500);
    fixture.detectChanges();
    targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${LANGUAGES_COLUMN_INDEX})`))[0].nativeElement;
    expect(targetedCell.textContent).toContain(rows[1].language.label);
  }));

  it('should sort the table and get the first element by descending alphabetic order', fakeAsync(() => {
    const sortUpButton = fixture.debugElement.queryAll(By.css(".ant-table-column-sorter-up"))[0];
    let targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${LANGUAGES_COLUMN_INDEX})`))[0].nativeElement;
    expect(targetedCell.textContent).toContain(rows[0].language.label);
    sortUpButton.nativeElement.click();
    sortUpButton.nativeElement.click();
    tick(500);
    fixture.detectChanges();
    targetedCell = fixture.debugElement.queryAll(By.css(`body td:nth-child(${LANGUAGES_COLUMN_INDEX})`))[0].nativeElement;
    expect(targetedCell.textContent).toContain(rows[0].language.label);
  }));

});
