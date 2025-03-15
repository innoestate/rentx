import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NzUxCellEditableNumberComponent } from "../nz-ui-cell-editable-number.component";

describe('NzUxCellEditableNumberComponent unit test', () => {

  let fixture: ComponentFixture<NzUxCellEditableNumberComponent>;
  let component: NzUxCellEditableNumberComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzUxCellEditableNumberComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzUxCellEditableNumberComponent);
    fixture.componentRef.setInput('value', 1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the correct initial value', () => {
    expect(component.value()).toBe(1);
  })


  it('should have a specific class when loading value', () => {

    expectLoadingValueStyleToBe(false);

    updateSelectedItemFromInside(2);
    expectLoadingValueStyleToBe(true);

    updateSelectedItemFromOutside(2);
    expectLoadingValueStyleToBe(false);

  })


  const expectLoadingValueStyleToBe = (loading: boolean ) => {
    let clickableElement = fixture.debugElement.query(By.css('.clickable')).nativeElement;
    expect(clickableElement.classList.contains('loading-value')).toEqual(loading);
  }

  const updateSelectedItemFromInside = (value: number) => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  }

  const updateSelectedItemFromOutside = (value: number) => {
    fixture.componentRef.setInput('value', value);
    fixture.detectChanges();
  }


});
