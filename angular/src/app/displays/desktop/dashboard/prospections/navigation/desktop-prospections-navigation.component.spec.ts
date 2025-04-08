import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopProspectionsNavigationComponent } from './desktop-prospections-navigation.component';

describe('DesktopProspectionsNavigationComponent', () => {
  let component: DesktopProspectionsNavigationComponent;
  let fixture: ComponentFixture<DesktopProspectionsNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesktopProspectionsNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopProspectionsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
