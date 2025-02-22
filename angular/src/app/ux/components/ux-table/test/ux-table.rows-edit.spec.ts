import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { rowsMock } from './mock/rows.mock';
import { columnsMock } from './mock/columns.mock';
import { UxTableColumnItem } from '../models/ux-table.model';
import { UxTableComponent } from '../ux-table.component';

describe('UxTableComponent test the edition of a cell', () => {

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
    spyOn(component.editRow, 'emit');
  });

  it('should modify the value and emit editRow event', fakeAsync(() => {
    const cell = fixture.nativeElement.querySelector('nz-table');
    let cellToEdit = cell.querySelector('tbody tr:nth-child(2) td:nth-child(2) > .clickable');
    cellToEdit.click();
    tick(500);
    fixture.detectChanges();

    let inputElement = cell.querySelector('tbody tr:nth-child(2) td:nth-child(2) > input');
    expect(inputElement.hidden).toBeFalse();
    inputElement.value = 'Modified name';
    inputElement.dispatchEvent(new Event('change'));
    tick(500);
    fixture.detectChanges();

    cellToEdit = cell.querySelector('tbody tr:nth-child(2) td:nth-child(2) > .clickable');
    expect(cellToEdit.textContent).toBe('Modified name');
    expect(component.editRow.emit).toHaveBeenCalled();
  }))

});
