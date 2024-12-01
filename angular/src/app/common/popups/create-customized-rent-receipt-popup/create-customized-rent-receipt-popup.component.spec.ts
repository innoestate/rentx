import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomizedRentReceiptPopupComponent } from './create-customized-rent-receipt-popup.component';

describe('CreateCustomizedRentReceiptPopupComponent', () => {
  let component: CreateCustomizedRentReceiptPopupComponent;
  let fixture: ComponentFixture<CreateCustomizedRentReceiptPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCustomizedRentReceiptPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCustomizedRentReceiptPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
