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

  it('should trigger the displaying of input for editing cell after clicking', () => {
    expectTheCellToBeNotYetEditableBeforeClick(1);
    expectTheCellToBeEditableAfterClick(1);
  })

  it('should modify the number value and emit editRow event', () => {
    expectTheCellToBeEditableAfterClick(1);
    editCell(1, 5000);
    expectValueOfCellToBe(1, 5000);
  });

  it('should modify the number value and emit editRow event', () => {
    expectTheCellToBeEditableAfterClick(1);
    editCell(1, 44);
    expectValueOfCellToBe(1, 44);
  });

  it('should has only one value edited and emitted in cells', () => {
    editCell(1, 30);
    expectOnlyOneCellToBeEdited();
  })

  const expectTheCellToBeNotYetEditableBeforeClick = (editableCellColumnIndex: number) => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-number > .clickable'))[editableCellColumnIndex].nativeElement;
    let inputElement = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-number > input'))[editableCellColumnIndex].nativeElement;
    expect(cellToEdit.hidden).toBeFalse();
    expect(inputElement.hidden).toBeTrue();
  }

  const expectTheCellToBeEditableAfterClick = (editableCellColumnIndex: number) => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-number > .clickable'))[editableCellColumnIndex].nativeElement;
    let inputElement = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-number > input'))[editableCellColumnIndex].nativeElement;
    cellToEdit.click();
    fixture.detectChanges();

    expect(cellToEdit.hidden).toBeTrue();
    expect(inputElement.hidden).toBeFalse();
  }

  const editCell = (editableCellColumnIndex: number, value: number) => {
    let inputElement = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-number > input'))[editableCellColumnIndex].nativeElement;
    inputElement.value = value;
    inputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  }

  const expectValueOfCellToBe = (editableCellColumnIndex: number, value: number) => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-number > .clickable'))[editableCellColumnIndex].nativeElement;
    cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-editable-number > .clickable'))[editableCellColumnIndex].nativeElement;
    expect(cellToEdit.textContent).toBe(value + '');
    const emittedRow = (component.editRow.emit as jasmine.Spy).calls.mostRecent().args[0];
    expect(emittedRow.cells.zip).toBe(value);
    expect(Object.keys(emittedRow.cells).length).toBe(1);
  }

  const expectOnlyOneCellToBeEdited = () => {
    const emittedRow = (component.editRow.emit as jasmine.Spy).calls.mostRecent().args[0];
    expect(Object.keys(emittedRow.cells).length).toBe(1);
  }

});
