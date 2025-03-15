import { ComponentFixture } from '@angular/core/testing';
import { UiButtonComponent } from '../ui-button.component';
import { configureFixture } from './utils/ui-button.disabled.utils';
import { configureModule } from './utils/ui-button.utils';

describe('UiButtonComponent disabled', () => {
  let component: UiButtonComponent;
  let fixture: ComponentFixture<UiButtonComponent>;

  beforeEach(async () => {

    await configureModule();
    fixture = await configureFixture();
    component = fixture.componentInstance;
    spyOn(component.click, 'emit');

  });

  it('should contain the text value', () => {
    expect(component).toBeTruthy();
    expect(component.text()).toBe('Test Disabled Button');
  });

  it('should have a button with the innerHtml text', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should have a button with a default style', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('ng-reflect-disabled')).toBe('true');
  })

  it('should not trigger the click event', () => {
    fixture.componentRef.instance.onClick();
    expect(component.click.emit).toHaveBeenCalled();
  });

  it('should trigger the click event', () => {
    fixture.componentRef.setInput('disabled', false);
    fixture.componentRef.instance.onClick();
    expect(component.click.emit).toHaveBeenCalled();
  });

});
