import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NzUxCellEditableNumberComponent } from "../nz-ui-cell-editable-number.component";

describe('NzUxCellEditableNumberComponent unit test', () => {

  let fixture: ComponentFixture<NzUxCellEditableNumberComponent>;
  let component: NzUxCellEditableNumberComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzUxCellEditableNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzUxCellEditableNumberComponent);
    fixture.componentRef.setInput('value', 10);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should have a specific class when loading value', fakeAsync(() => {

    expect(component.value()).toBe(10);
    let clickableElement = fixture.debugElement.query(By.css('.clickable')).nativeElement;
    expect(clickableElement.classList.contains('loading-value')).toBeFalsy();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 20;
    input.dispatchEvent(new Event('change'));

    tick(500);
    fixture.detectChanges();
    expect(clickableElement.classList.contains('loading-value')).toBeTruthy();

    fixture.componentRef.setInput('value', 20);
    tick(500);
    fixture.detectChanges();
    expect(component.value()).toBe(20);
    expect(clickableElement.classList.contains('loading-value')).toBeFalsy();

  }))

});
