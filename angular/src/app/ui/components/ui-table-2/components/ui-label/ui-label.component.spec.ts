import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLabelComponent } from './ui-label.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('UiLabelComponent', () => {
  let component: UiLabelComponent;
  let fixture: ComponentFixture<UiLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLabelComponent],
      providers: [
        provideExperimentalZonelessChangeDetection()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiLabelComponent);
    component = fixture.componentInstance;

  });

  it('should display label', () => {
    fixture.componentRef.setInput('label', {title: {label: 'test'}});
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('test');
  });

  it('should display a bold label', () => {
    fixture.componentRef.setInput('label', {title: {label: 'test2', weight: 'bold'}});
    fixture.detectChanges();
    const elements = fixture.nativeElement.querySelectorAll('*');
    const correspondants = Array.from(elements).filter(element => (element as HTMLDivElement).textContent?.includes('test2'));
    expect((correspondants[0] as HTMLDivElement).style.fontFamily).toBe('primary-bold');
  });

  it('should display a normal label', () => {
    fixture.componentRef.setInput('label', {title: {label: 'test2'}});
    fixture.detectChanges();
    const elements = fixture.nativeElement.querySelectorAll('*');
    const correspondants = Array.from(elements).filter(element => (element as HTMLDivElement).textContent?.includes('test2'));
    expect((correspondants[0] as HTMLDivElement).style.fontFamily).toBe('primary');
  });

});
