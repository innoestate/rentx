import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiNestedDropdownSelectComponent } from './ui-nested-dropdown-select.component';

describe('UiNestedDropdownSelectComponent', () => {
  let component: UiNestedDropdownSelectComponent;
  let fixture: ComponentFixture<UiNestedDropdownSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiNestedDropdownSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiNestedDropdownSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
