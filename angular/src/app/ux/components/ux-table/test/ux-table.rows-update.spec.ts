import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UxTableColumnItem } from '../models/ux-table.column.model';
import { UxTableComponent } from '../ux-table.component';
import { columnsMock } from './mock/columns.mock';
import { rowsMockItems } from './mock/rows.mock';
import { cloneDeep } from 'lodash';

describe('UxTableComponent test the update of a value in a cell', () => {

  let rows: any[] = cloneDeep(rowsMockItems);
  let columns: UxTableColumnItem[] = [...columnsMock];
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

  it('should have a value in a specific cell', () => {
    const cellToUpdate = fixture.debugElement.queryAll(By.css("body td:nth-child(2)"));
    expect(cellToUpdate[1].nativeElement.textContent).toBe(rows[1].name);
  });

  it('should have a modified value in a specific cell', fakeAsync(() => {
    rows[1].name = 'Modified name';
    fixture.componentRef.setInput('rows', [...rows]);
    fixture.detectChanges();
    const cellToUpdate = fixture.debugElement.queryAll(By.css("body td:nth-child(2)"));
    expect(cellToUpdate[1].nativeElement.textContent).toBe('Modified name');
  }))

});
