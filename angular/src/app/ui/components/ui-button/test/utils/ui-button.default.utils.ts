import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UiButtonComponent } from "../../ui-button.component";

export const configureModule = async () => {
  await TestBed.configureTestingModule({
    imports: [UiButtonComponent]
  })
  .compileComponents();
}

export const configureFixture = async () => {
  let fixture: ComponentFixture<UiButtonComponent> = TestBed.createComponent(UiButtonComponent);
  fixture.componentRef.setInput('text', 'Test Default Button');
  fixture.detectChanges();
  return fixture;
}
