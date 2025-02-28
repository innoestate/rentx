import { ComponentFixture, TestBed } from '@angular/core/testing';
import { cloneDeep } from 'lodash';
import { simpleLanguagesList } from '../mock/simple-languages.mock';
import { UxNestedDropdownComponent } from '../ux-nested-dropdown.component';

describe('UxNestedDropdownComponent test selection of an item', () => {
  let component: UxNestedDropdownComponent;
  let fixture: ComponentFixture<UxNestedDropdownComponent>;
  let list = cloneDeep(simpleLanguagesList);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UxNestedDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UxNestedDropdownComponent);
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
