import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { UiDropdownComponent } from '../ui-dropdown.component';
import { list } from './utils/list.utils';
import { configureFixture, configureModule } from './utils/ui-dropdown.utils';

describe('UiDropdownComponent test selection of items', () => {
  let component: UiDropdownComponent;
  let fixture: ComponentFixture<UiDropdownComponent>;

  beforeEach(async () => {

    await configureModule();
    fixture = await configureFixture(list);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the first item selected', () => {
    const selectedItem = fixture.nativeElement.querySelector('.ant-select-selection-item');
    expect(selectedItem.getAttribute('title')).toBe('item 1');
  })

  it('should select an other item', fakeAsync(() => {
    fixture.nativeElement.querySelector('.ant-select').click();
    tick(500);
    fixture.detectChanges();
    (document.querySelectorAll('.ant-select-item-option-content')[1] as HTMLElement).click();
    fixture.detectChanges();
    expect(component.nzFormControl.value).toBe('item 2');
  }));

});
