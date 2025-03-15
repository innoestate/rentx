import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UiButtonComponent } from "../../ui-button.component";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";


export const configureFixture = async () => {
  let fixture: ComponentFixture<UiButtonComponent> = TestBed.createComponent(UiButtonComponent);
  fixture.componentRef.setInput('text', 'Test Danger Button');
  fixture.componentRef.setInput('type', 'danger');
  fixture.detectChanges();
  return fixture;
}
