import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UxButtonComponent } from "../../ux-button.component";

export const configureModule = async () => {
  await TestBed.configureTestingModule({
    imports: [UxButtonComponent]
  })
  .compileComponents();
}

export const configureFixture = async () => {
  let fixture: ComponentFixture<UxButtonComponent> = TestBed.createComponent(UxButtonComponent);
  fixture.componentRef.setInput('text', 'Test Default Button');
  fixture.detectChanges();
  return fixture;
}
