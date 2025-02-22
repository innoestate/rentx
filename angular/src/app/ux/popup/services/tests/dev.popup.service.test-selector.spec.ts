import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DevPopupService } from '../dev.popup.service';
import { PopupService } from '../popup.service';
import { configureModule } from './test/test.utils';

@Component({
  template: ''
})
class MockComponent {}

describe('PopupService test that close icon has correct selector for tests (especially e2e tests).', () => {
  let service: PopupService;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    configureModule();
    service = TestBed.inject(DevPopupService);
    fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();
  });

  it('should have a test-selector attribute as ux-popup-close-icon after open', fakeAsync( () => {
    service.openPopup(MockComponent, 'Test Title');
    tick(500);
    const closeIcon = document.querySelector('.anticon-close');
    expect(closeIcon?.getAttribute('test-selector')).toBe('ux-popup-close-icon');
  }));
});
