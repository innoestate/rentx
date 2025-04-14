import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiEditableTextComponent } from './ui-editable-text.component';

describe('UiEditableTextComponent', () => {
  let component: UiEditableTextComponent;
  let fixture: ComponentFixture<UiEditableTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiEditableTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiEditableTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
