import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { rowsMock } from './mock/rows.mock';
import { columnsMock } from './mock/columns.mock';
import { UxTableColumnItem } from '../models/ux-table.model';
import { UxTableComponent } from '../ux-table.component';

describe('UxTableComponent test the update of a value in a cell', () => {

  let rows: any[] = [...rowsMock];
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
    const cell = fixture.nativeElement.querySelector('nz-table');
    const cellToUpdate = cell.querySelector('tbody tr:nth-child(2) td:nth-child(2)');
    expect(cellToUpdate.textContent).toBe(rows[1].name);
  });

  it('should have a modified value in a specific cell', fakeAsync(() => {
    rows[1].name = 'Modified name';
    fixture.componentRef.setInput('rows', [...rows]);
    fixture.detectChanges();
    const cell = fixture.nativeElement.querySelector('nz-table');
    const cellToUpdate = cell.querySelector('tbody tr:nth-child(2) td:nth-child(2)');
    expect(cellToUpdate.textContent).toBe('Modified name');
  }))

});
