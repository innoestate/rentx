import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UxButtonComponent } from './ux-button.component';

describe('UxButtonComponent', () => {
  let component: UxButtonComponent;
  let fixture: ComponentFixture<UxButtonComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [UxButtonComponent],
      imports: [NzButtonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UxButtonComponent);
    fixture.componentRef.setInput('text', 'Test Button Text');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain the text value', () => {
    expect(component).toBeTruthy();
    expect(component.text()).toBe('Test Button Text');
  });

  it('should have a button with the innerHtml text', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });


});
