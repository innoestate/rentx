import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCellEditableNumberComponent } from './ui-cell-editable-number.component';

describe('UiCellEditableNumberComponent', () => {
  let component: UiCellEditableNumberComponent;
  let fixture: ComponentFixture<UiCellEditableNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCellEditableNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCellEditableNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
