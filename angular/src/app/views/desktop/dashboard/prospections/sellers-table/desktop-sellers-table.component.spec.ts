import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopSellersTableComponent } from './desktop-sellers-table.component';

describe('DesktopSellersTableComponent', () => {
  let component: DesktopSellersTableComponent;
  let fixture: ComponentFixture<DesktopSellersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesktopSellersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopSellersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
