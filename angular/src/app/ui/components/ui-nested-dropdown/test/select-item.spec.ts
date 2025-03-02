import { ComponentFixture, TestBed } from '@angular/core/testing';
import { cloneDeep } from 'lodash';
import { simpleLanguagesList } from '../mock/simple-languages.mock';
import { UiNestedDropdownComponent } from '../ui-nested-dropdown.component';

describe('UiNestedDropdownComponent test selection of an item', () => {
  let component: UiNestedDropdownComponent;
  let fixture: ComponentFixture<UiNestedDropdownComponent>;
  let list = cloneDeep(simpleLanguagesList);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiNestedDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiNestedDropdownComponent);
    fixture.componentRef.setInput('list', list);
    fixture.componentRef.setInput('value', list[0]);
    component = fixture.componentInstance;
    spyOn(component, 'list').and.returnValue(list);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the first item selected', () => {
    const selectedItem = fixture.nativeElement.querySelector('.ant-dropdown-trigger');
    expect(selectedItem.innerText).toBe('Français');
  })

});
