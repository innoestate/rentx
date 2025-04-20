import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCellEditableComponent } from './ui-cell-editable.component';

describe('UiCellEditableComponent', () => {
  let component: UiCellEditableComponent;
  let fixture: ComponentFixture<UiCellEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCellEditableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCellEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
