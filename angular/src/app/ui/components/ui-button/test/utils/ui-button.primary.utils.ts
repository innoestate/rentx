import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UiButtonComponent } from "../../ui-button.component";

export const configureFixture = async () => {
  let fixture: ComponentFixture<UiButtonComponent> = TestBed.createComponent(UiButtonComponent);
  fixture.componentRef.setInput('text', 'Test Primary Button');
  fixture.componentRef.setInput('type', 'primary');
  fixture.detectChanges();
  return fixture;
}
