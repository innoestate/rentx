import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UxButtonComponent } from "./ux-button.component";
import { NzButtonModule } from "ng-zorro-antd/button";

export const configureModule = async () => {
  await TestBed.configureTestingModule({
    declarations: [UxButtonComponent],
    imports: [NzButtonModule]
  })
  .compileComponents();
}

export const configureFixture = async () => {
  let fixture: ComponentFixture<UxButtonComponent> = TestBed.createComponent(UxButtonComponent);
  fixture.componentRef.setInput('text', 'Test Button Text');
  fixture.detectChanges();
  return fixture;
}
