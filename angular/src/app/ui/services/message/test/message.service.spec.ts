import { TestBed } from '@angular/core/testing';
import { UiMessageService } from '../message.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { UiModule } from 'src/app/ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expectThatMessageIsDisplayed } from './message.test.utils';


describe('UiMessageService', () => {
  let service: UiMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        UiModule
      ],
      providers: [
        provideExperimentalZonelessChangeDetection()
      ]
    });
    service = TestBed.inject(UiMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call success method of NzMessageService', () => {
    const message = 'Success message';
    const spy = spyOn(service['nzMessageService'], 'success');
    service.success(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should call error method of NzMessageService', () => {
    const message = 'Error message';
    const spy = spyOn(service['nzMessageService'], 'error');
    service.error(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should call info method of NzMessageService', () => {
    const message = 'Info message';
    const spy = spyOn(service['nzMessageService'], 'info');
    service.info(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should call warning method of NzMessageService', () => {
    const message = 'Warning message';
    const spy = spyOn(service['nzMessageService'], 'warning');
    service.warning(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should create the div to display success message', () => {
    const message = "test message div creation";
    service.success(message);
    expectThatMessageIsDisplayed(message);
  });

  it('should create the div to display error message', () => {
    const message = "test message div creation";
    service.error(message);
    expectThatMessageIsDisplayed(message);
  });

  it('should create the div to display info message', () => {
    const message = "test message div creation";
    service.info(message);
    expectThatMessageIsDisplayed(message);
  });

  it('should create the div to display warning message', () => {
    const message = "test message div creation";
    service.warning(message);
    expectThatMessageIsDisplayed(message);
  });

});
