import { cloneDeep } from 'lodash';
import { NzUiCellDropdownComponent } from '../nz-ui-cell-dropdown.component';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UiTableComponent test the edition of a string cell', () => {

  let component: NzUiCellDropdownComponent;
  let fixture: ComponentFixture<NzUiCellDropdownComponent>;

  let countries = [
    {
      label: 'France',
      value: 'france'
    },
    {
      label: 'Angleterre',
      value: 'england'
    }
  ]
  let value = {
    label: 'France',
    value: 'france'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzUiCellDropdownComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzUiCellDropdownComponent);
    fixture.componentRef.setInput('list', countries);
    fixture.componentRef.setInput('value', value);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should hide the field and show input after clicking', fakeAsync(() => {
    let cellToEdit = fixture.debugElement.query(By.css('.clickable')).nativeElement;
    expect(cellToEdit).toBeTruthy();
    //Need to test nz-select-item...actualy failing to find the element (even if it is in the browser)
  }))

});
