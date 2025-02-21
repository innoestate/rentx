import { ComponentFixture } from '@angular/core/testing';
import { UxButtonComponent } from '../ux-button.component';
import { configureFixture, configureModule } from './utils/ux-button.disabled.utils';

describe('UxButtonComponent disabled', () => {
  let component: UxButtonComponent;
  let fixture: ComponentFixture<UxButtonComponent>;

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
