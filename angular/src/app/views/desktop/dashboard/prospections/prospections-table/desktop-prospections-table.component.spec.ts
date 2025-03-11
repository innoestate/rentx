import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopProspectionsTableComponent } from './desktop-prospections-table.component';

describe('DesktopProspectionsTableComponent', () => {
  let component: DesktopProspectionsTableComponent;
  let fixture: ComponentFixture<DesktopProspectionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesktopProspectionsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopProspectionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
