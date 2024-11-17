import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEstatePopupComponent } from './create-estate-popup.component';

describe('CreateEstatePopupComponent', () => {
  let component: CreateEstatePopupComponent;
  let fixture: ComponentFixture<CreateEstatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEstatePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEstatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
