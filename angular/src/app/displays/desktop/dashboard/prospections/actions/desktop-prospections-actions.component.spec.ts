import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopProspectionsActionsComponent } from './desktop-prospections-actions.component';

describe('DesktopProspectionsActionsComponent', () => {
  let component: DesktopProspectionsActionsComponent;
  let fixture: ComponentFixture<DesktopProspectionsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesktopProspectionsActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopProspectionsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
