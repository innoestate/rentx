import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UxTableColumnItem } from '../models/ux-table.column.model';
import { UxTableComponent } from '../ux-table.component';
import { columnsWithEditableZipMock } from './mock/columns.editable-zip.mock';
import { rowsMockItems } from './mock/rows.mock';
import { cloneDeep } from 'lodash';


describe('UxTableComponent test the edition of a number cell', () => {

  let rows: any[] = cloneDeep(rowsMockItems);
  let columns: UxTableColumnItem[] = [...columnsWithEditableZipMock];
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
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ux-cell-editable-number > .clickable'))[1].nativeElement;
    let inputElement = fixture.debugElement.queryAll(By.css('nz-ux-cell-editable-number > input'))[1].nativeElement;
    expect(cellToEdit.hidden).toBeFalse();
    expect(inputElement.hidden).toBeTrue();

    cellToEdit.click();
    fixture.detectChanges();

    expect(cellToEdit.hidden).toBeTrue();
    expect(inputElement.hidden).toBeFalse();
  }))

  it('should modify the number value and emit editRow event', fakeAsync(() => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ux-cell-editable-number > .clickable'))[1].nativeElement;
    cellToEdit.click();
    tick(500);
    fixture.detectChanges();

    let inputElement = fixture.debugElement.queryAll(By.css('nz-ux-cell-editable-number > input'))[1].nativeElement;
    inputElement.value = 5000;
    inputElement.dispatchEvent(new Event('change'));
    tick(500);
    fixture.detectChanges();

    cellToEdit = fixture.debugElement.queryAll(By.css('nz-ux-cell-editable-number > .clickable'))[1].nativeElement;
    expect(cellToEdit.textContent).toBe('5000');
    const emittedRow = (component.editRow.emit as jasmine.Spy).calls.mostRecent().args[0];
    expect(emittedRow.zip).toBe(5000);
  }));

});
