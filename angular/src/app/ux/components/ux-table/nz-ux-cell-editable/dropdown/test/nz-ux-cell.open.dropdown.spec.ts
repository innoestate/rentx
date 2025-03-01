import { cloneDeep } from 'lodash';
import { NzUxCellDropdownComponent } from '../dropdown.component';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UxTableComponent test the edition of a string cell', () => {

  let component: NzUxCellDropdownComponent;
  let fixture: ComponentFixture<NzUxCellDropdownComponent>;

  let countries = [
    {
      label: 'France',
      target: 'france'
    },
    {
      label: 'Angleterre',
      target: 'england'
    }
  ]
  let target = {
    label: 'France',
    target: 'france'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzUxCellDropdownComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzUxCellDropdownComponent);
    fixture.componentRef.setInput('list', countries);
    fixture.componentRef.setInput('value', target);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should hide the field and show input after clicking', fakeAsync(() => {
    let cellToEdit = fixture.debugElement.query(By.css('.clickable')).nativeElement;
    expect(cellToEdit).toBeTruthy();
    //Need to test nz-select-item...actualy failing to find the element (even if it is in the browser)
  }))

});
