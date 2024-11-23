import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOwnerPopupComponent } from './create-owner-popup.component';

describe('CreateOwnerPopupComponent', () => {
  let component: CreateOwnerPopupComponent;
  let fixture: ComponentFixture<CreateOwnerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOwnerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOwnerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
