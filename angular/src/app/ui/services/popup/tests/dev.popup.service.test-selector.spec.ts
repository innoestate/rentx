import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPopupService } from '../popup.service';
import { configureModule } from './test/test.utils';

@Component({
  template: ''
})
class MockComponent { }

describe('PopupService test that close icon has correct selector for tests (especially e2e tests).', () => {
  let service: UiPopupService;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    configureModule();
    service = TestBed.inject(UiPopupService);
    fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();
  });

  it('should have a nz-modal open', async() => {
    openPopup();
    await checkBodyChangesUntilModalFound();
  });

  const openPopup = () => {
    setTimeout(() => {
      service.openPopup(MockComponent, 'Test Title');
    }, 0);
  }

  const checkBodyChangesUntilModalFound = () => {
    return new Promise<void>(resolve => {
      const observer = new MutationObserver((mutations, observer) => {
        const modal = document.body.querySelector('.ant-modal-content');
        if (modal) {
          observer.disconnect();
          resolve();
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });

  }

});
