import { ComponentFixture } from '@angular/core/testing';
import { UiDropdownComponent } from '../ui-dropdown.component';
import { list } from './utils/list.utils';
import { configureFixture, configureModule } from './utils/ui-dropdown.utils';


const listenToClick = (element: HTMLElement) => {
  return new Promise<void>((resolve) => {
    element.addEventListener('click', () => {
      setTimeout(() => {
        resolve();
      }, 0);
    })
    element.click();
  })
}

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

  it('should have the correct default item selected', () => {
    expectSelectedValue('item 1');
  })

  it('should select an other item', async() => {
    await clickOnDropDown();
    await clickOnItem(1);
    fixture.detectChanges();
    expectSelectedValue('item 2');
  });

  it('should re-select the default item', async() => {
    await clickOnDropDown();
    await clickOnItem(0);
    fixture.detectChanges();
    expectSelectedValue('item 1');
  });

  const clickOnDropDown = async () => {
    await listenToClick(fixture.nativeElement.querySelector('.ant-select'));
  }

  const clickOnItem = async (index: number) => {
    await listenToClick((document.querySelectorAll('.ant-select-item-option-content')[index] as HTMLElement));
  }

  const expectSelectedValue = (value: string) => {
    const selectedItem = fixture.nativeElement.querySelector('.ant-select-selection-item');
    expect(selectedItem.getAttribute('title')).toContain(value);
    expect(component.nzFormControl.value).toBe(value);
  }

});
