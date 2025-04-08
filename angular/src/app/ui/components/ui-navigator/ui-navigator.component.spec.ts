import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiNavigatorComponent } from './ui-navigator.component';

describe('UiNavigatorComponent', () => {
  let component: UiNavigatorComponent;
  let fixture: ComponentFixture<UiNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiNavigatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
