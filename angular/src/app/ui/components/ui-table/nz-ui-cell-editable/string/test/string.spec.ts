import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NzUxCellEditableStringComponent } from "../string.component";

describe('NzUxCellEditableStringComponent unit test', () => {

  let fixture: ComponentFixture<NzUxCellEditableStringComponent>;
  let component: NzUxCellEditableStringComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzUxCellEditableStringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzUxCellEditableStringComponent);
    fixture.componentRef.setInput('value', 'before');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should have a specific class when loading value', fakeAsync(() => {

    expect(component.value()).toBe('before');
    let clickableElement = fixture.debugElement.query(By.css('.clickable')).nativeElement;
    expect(clickableElement.classList.contains('loading-value')).toBeFalsy();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'after';
    input.dispatchEvent(new Event('change'));

    tick(500);
    fixture.detectChanges();
    expect(clickableElement.classList.contains('loading-value')).toBeTruthy();

    fixture.componentRef.setInput('value', 'after');
    tick(500);
    fixture.detectChanges();
    expect(component.value()).toBe('after');
    expect(clickableElement.classList.contains('loading-value')).toBeFalsy();

  }))

});
