import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopProspectionsHandlerMenuComponent } from './desktop-prospections-handler-menu.component';

describe('DesktopProspectionsHandlerMenuComponent', () => {
  let component: DesktopProspectionsHandlerMenuComponent;
  let fixture: ComponentFixture<DesktopProspectionsHandlerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesktopProspectionsHandlerMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopProspectionsHandlerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
