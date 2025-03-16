import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NzUiCellEditableHelper } from "../../test/helper/ui-editable-cell.helper";
import { NzUxCellEditableStringComponent } from "../nz-ui-cell-editable-string.component";

describe('NzUxCellEditableStringComponent unit test', () => {

  let fixture: ComponentFixture<NzUxCellEditableStringComponent>;
  let component: NzUxCellEditableStringComponent;
  let helper: NzUiCellEditableHelper;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzUxCellEditableStringComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzUxCellEditableStringComponent);
    helper = new NzUiCellEditableHelper(fixture);
    fixture.componentRef.setInput('value', 'before');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should have the loading cell style when loading value', () => {

    helper.expectLoadingValueStyleToBe(false);

    helper.updateValueFromInside('after');
    helper.expectLoadingValueStyleToBe(true);

    helper.updateValueFromOutside('after');
    helper.expectLoadingValueStyleToBe(false);

  })

});
