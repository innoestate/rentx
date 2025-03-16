import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiTableColumnItem } from '../models/ui-table.column.model';
import { UiTableComponent } from '../ui-table.component';
import { columnsWithEditableNameMock } from './mock/columns.editable-name.mock';
import { RowMock, rowsMockItems } from './mock/rows.mock';
import { cloneDeep } from 'lodash';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('UiTableComponent test the edition of a string cell', () => {

  let rows: RowMock[] = cloneDeep(rowsMockItems);
  let columns: UiTableColumnItem[] = [...columnsWithEditableNameMock];
  let component: UiTableComponent;
  let fixture: ComponentFixture<UiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTableComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTableComponent);
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('columns', columns);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.editRow, 'emit');
  });

  it('should hide the field and show input after clicking', () => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-string > .clickable'))[1].nativeElement;
    let inputElement = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-string > input'))[1].nativeElement;
    expect(cellToEdit.hidden).toBeFalse();
    expect(inputElement.hidden).toBeTrue();

    cellToEdit.click();
    fixture.detectChanges();

    expect(cellToEdit.hidden).toBeTrue();
    expect(inputElement.hidden).toBeFalse();
  })

  it('should modify the value and emit editRow event', () => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-string > .clickable'))[1].nativeElement;
    cellToEdit.click();
    fixture.detectChanges();

    let inputElement = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-string > input'))[1].nativeElement;
    inputElement.value = 'Modified name';
    inputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-string > .clickable'))[1].nativeElement;
    expect(cellToEdit.textContent).toBe('Modified name');
    expect(component.editRow.emit).toHaveBeenCalled();
  });

});
