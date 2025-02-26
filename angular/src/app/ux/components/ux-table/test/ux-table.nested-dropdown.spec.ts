import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cloneDeep } from 'lodash';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UxTableColumnItem } from '../models/ux-table.column.model';
import { UxTableComponent } from '../ux-table.component';
import { columnsWithCityAsDropDownMock } from './mock/columns.dropdown.mock';
import { RowMock, rowsMockItems } from './mock/rows.mock';
import { UxDropdownComponent } from '../../ux-dropdown/ux-dropdown.component';

describe('UxTableComponent test a dropdown in a cell', () => {

  let rows: RowMock[] = cloneDeep(rowsMockItems);
  let columns: UxTableColumnItem[] = [...columnsWithCityAsDropDownMock];
  let component: UxTableComponent<any>;
  let fixture: ComponentFixture<UxTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UxTableComponent, UxDropdownComponent, FormsModule, NzSelectModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UxTableComponent);
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('columns', columns);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.editRow, 'emit');
    spyOn(component, 'startEdit');
  });

  it('should open the nested dropdown', fakeAsync(() => {
    let cellToEdit = fixture.debugElement.queryAll(By.css('nz-ux-cell-nested-dropdown > .clickable'))[0].nativeElement;
    cellToEdit.click();
    expect(component.startEdit).toHaveBeenCalled();
  }))

});
