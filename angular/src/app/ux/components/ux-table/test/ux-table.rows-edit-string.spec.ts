import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UxTableColumnItem } from '../models/ux-table.column.model';
import { UxTableComponent } from '../ux-table.component';
import { columnsWithEditableNameMock } from './mock/columns.editable-name.mock';
import { RowMock, rowsMockItems } from './mock/rows.mock';
import { cloneDeep } from 'lodash';

describe('UxTableComponent test the edition of a cell', () => {

  let rows: RowMock[] = cloneDeep(rowsMockItems);
  let columns: UxTableColumnItem[] = [...columnsWithEditableNameMock];
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

  it('should hide the field and show input after clicking', fakeAsync(() => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ux-cell-editable-string > .clickable'))[1].nativeElement;
    let inputElement = fixture.debugElement.queryAll(By.css('nz-ux-cell-editable-string > input'))[1].nativeElement;
    expect(cellToEdit.hidden).toBeFalse();
    expect(inputElement.hidden).toBeTrue();

    cellToEdit.click();
    fixture.detectChanges();

    expect(cellToEdit.hidden).toBeTrue();
    expect(inputElement.hidden).toBeFalse();
  }))

  it('should modify the value and emit editRow event', fakeAsync(() => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ux-cell-editable-string > .clickable'))[1].nativeElement;
    cellToEdit.click();
    tick(500);
    fixture.detectChanges();

    let inputElement = fixture.debugElement.queryAll(By.css('nz-ux-cell-editable-string > input'))[1].nativeElement;
    inputElement.value = 'Modified name';
    inputElement.dispatchEvent(new Event('change'));
    tick(500);
    fixture.detectChanges();

    cellToEdit = fixture.debugElement.queryAll(By.css('nz-ux-cell-editable-string > .clickable'))[1].nativeElement;
    expect(cellToEdit.textContent).toBe('Modified name');
    expect(component.editRow.emit).toHaveBeenCalled();
  }))

});
