import { ComponentFixture } from '@angular/core/testing';
import { UxButtonComponent } from '../ux-button.component';
import { configureFixture, configureModule } from './utils/ux-button.default.utils';

describe('UxButtonComponent default', () => {
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
    expect(component.text()).toBe('Test Default Button');
  });

  it('should have a button with the innerHtml text', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should have a button with a default style', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('ant-btn-default')).toBeTrue();
  })

  it('should trigger the click event', () => {
    fixture.componentRef.instance.onClick();
    expect(component.click.emit).toHaveBeenCalled();
  });


});
