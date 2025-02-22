import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UxDropdownComponent } from './ux-dropdown.component';

describe('UxDropdownComponent', () => {
  let component: UxDropdownComponent;
  let fixture: ComponentFixture<UxDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UxDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UxDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
