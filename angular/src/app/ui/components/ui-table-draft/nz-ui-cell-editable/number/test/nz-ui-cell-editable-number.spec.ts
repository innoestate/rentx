import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NzUiCellEditableHelper } from "../../test/helper/ui-editable-cell.helper";
import { NzUxCellEditableNumberComponent } from "../nz-ui-cell-editable-number.component";

describe('NzUxCellEditableNumberComponent unit test', () => {

  let fixture: ComponentFixture<NzUxCellEditableNumberComponent>;
  let component: NzUxCellEditableNumberComponent;
  let helper: NzUiCellEditableHelper;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzUxCellEditableNumberComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzUxCellEditableNumberComponent);
    helper = new NzUiCellEditableHelper(fixture);
    fixture.componentRef.setInput('value', 1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the correct initial value', () => {
    expect(component.value()).toBe(1);
  })


  it('should have the loading cell style when loading value', () => {

    helper.expectLoadingValueStyleToBe(false);

    helper.updateValueFromInside(2);
    helper.expectLoadingValueStyleToBe(true);

    helper.updateValueFromOutside(2);
    helper.expectLoadingValueStyleToBe(false);

  })

});
