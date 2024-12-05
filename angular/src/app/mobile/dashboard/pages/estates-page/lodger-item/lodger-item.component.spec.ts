import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgerItemComponent } from './lodger-item.component';

describe('LodgerItemComponent', () => {
  let component: LodgerItemComponent;
  let fixture: ComponentFixture<LodgerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LodgerItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LodgerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
