import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cloneDeep } from 'lodash';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UiTableColumnItem } from '../models/ui-table.column.model';
import { UiTableComponent } from '../ui-table.component';
import { columnsWithCityAsDropDownMock } from './mock/columns.dropdown.mock';
import { RowMock, rowsMockItems } from './mock/rows.mock';
import { UiDropdownComponent } from '../../ui-dropdown/ui-dropdown.component';

describe('UiTableComponent test a dropdown in a cell', () => {

  let rows: RowMock[] = cloneDeep(rowsMockItems);
  let columns: UiTableColumnItem[] = [...columnsWithCityAsDropDownMock];
  let component: UiTableComponent;
  let fixture: ComponentFixture<UiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTableComponent, UiDropdownComponent, FormsModule, NzSelectModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTableComponent);
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('columns', columns);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.editRow, 'emit');
    spyOn(component, 'startEdit');
  });

  it('should open the nested dropdown', fakeAsync(() => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ui-cell-nested-dropdown > .clickable'))[0].nativeElement;
    cellToEdit.click();
    expect(component.startEdit).toHaveBeenCalled();
  }))

});
