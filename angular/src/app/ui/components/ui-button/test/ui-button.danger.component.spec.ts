import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiButtonComponent } from '../ui-button.component';

describe('UiButtonComponent danger', () => {
  let component: UiButtonComponent;
  let fixture: ComponentFixture<UiButtonComponent>;

  beforeEach(async () => {

    TestBed.configureTestingModule({
      imports: [UiButtonComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    }).compileComponents();
    fixture = TestBed.createComponent(UiButtonComponent);
    fixture.componentRef.setInput('text', 'Test Danger Button');
    fixture.componentRef.setInput('type', 'danger');
    fixture.detectChanges();
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
    expect(button.classList.contains('danger')).toBeTrue();
  })

  it('should trigger the click event', () => {
    fixture.componentRef.instance.onClick();
    expect(component.click.emit).toHaveBeenCalled();
  });


});
