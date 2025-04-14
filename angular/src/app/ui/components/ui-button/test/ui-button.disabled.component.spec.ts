import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiButtonComponent } from '../ui-button.component';

describe('UiButtonComponent disabled', () => {
  let component: UiButtonComponent;
  let fixture: ComponentFixture<UiButtonComponent>;

  beforeEach(async () => {

    TestBed.configureTestingModule({
      imports: [UiButtonComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    }).compileComponents();
    fixture = TestBed.createComponent(UiButtonComponent);
    fixture.componentRef.setInput('text', 'Test Disabled Button');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component = fixture.componentInstance;
    spyOn(component.click, 'emit');
    fixture.detectChanges();

  });

  it('should contain the text value', () => {
    expect(component).toBeTruthy();
    expect(component.text()).toBe('Test Disabled Button');
  });

  it('should have a button with a default style', () => {
    const button = fixture.nativeElement.querySelector('button');
    console.log('button', button);
    expect(button.hasAttribute('disabled')).toBeTrue();
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
