import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCellDropdownSelectComponent } from './ui-cell-dropdown-select.component';

describe('UiCellDropdownSelectComponent', () => {
  let component: UiCellDropdownSelectComponent;
  let fixture: ComponentFixture<UiCellDropdownSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCellDropdownSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCellDropdownSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
