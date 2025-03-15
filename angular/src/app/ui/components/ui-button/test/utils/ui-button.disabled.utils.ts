import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UiButtonComponent } from "../../ui-button.component";

export const configureFixture = async () => {
  let fixture: ComponentFixture<UiButtonComponent> = TestBed.createComponent(UiButtonComponent);
  fixture.componentRef.setInput('text', 'Test Disabled Button');
  fixture.componentRef.setInput('disabled', true);
  fixture.detectChanges();
  return fixture;
}
