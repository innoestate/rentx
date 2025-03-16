import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';
import { UiTableColumnItem } from '../models/ui-table.column.model';
import { UiTableComponent } from '../ui-table.component';
import { columnsWithEditableZipMock } from './mock/columns.editable-zip.mock';
import { rowsMockItems } from './mock/rows.mock';


describe('UiTableComponent test the edition of a number cell', () => {

  let rows: any[] = cloneDeep(rowsMockItems);
  let columns: UiTableColumnItem[] = [...columnsWithEditableZipMock];
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
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-number > .clickable'))[1].nativeElement;
    let inputElement = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-number > input'))[1].nativeElement;
    expect(cellToEdit.hidden).toBeFalse();
    expect(inputElement.hidden).toBeTrue();

    cellToEdit.click();
    fixture.detectChanges();

    expect(cellToEdit.hidden).toBeTrue();
    expect(inputElement.hidden).toBeFalse();
  })

  it('should modify the number value and emit editRow event', () => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-number > .clickable'))[1].nativeElement;
    cellToEdit.click();
    fixture.detectChanges();

    let inputElement = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-number > input'))[1].nativeElement;
    inputElement.value = 5000;
    inputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-number > .clickable'))[1].nativeElement;
    expect(cellToEdit.textContent).toBe('5000');
    const emittedRow = (component.editRow.emit as jasmine.Spy).calls.mostRecent().args[0];
    expect(emittedRow.cells.zip).toBe(5000);
  });

});
