import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopProspectionsComponent } from './prospections.component';

describe('ProspectionsComponent', () => {
  let component: DesktopProspectionsComponent;
  let fixture: ComponentFixture<DesktopProspectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopProspectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopProspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
