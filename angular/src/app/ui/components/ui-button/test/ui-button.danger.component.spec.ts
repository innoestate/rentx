import { ComponentFixture } from '@angular/core/testing';
import { UiButtonComponent } from '../ui-button.component';
import { configureFixture } from './utils/ui-button.danger.utils';
import { configureModule } from './utils/ui-button.utils';

describe('UiButtonComponent danger', () => {
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
    expect(component.text()).toBe('Test Danger Button');
  });

  it('should have a button with the innerHtml text', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should have a button with a default style', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('ant-btn-default')).toBeTrue();
  })

  it('should have a button with the attribute nzdanger', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('ant-btn-dangerous')).toBeTrue();
  })

  it('should trigger the click event', () => {
    fixture.componentRef.instance.onClick();
    expect(component.click.emit).toHaveBeenCalled();
  });


});
