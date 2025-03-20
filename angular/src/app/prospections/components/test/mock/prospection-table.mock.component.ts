import { Component } from "@angular/core";
import { ProspectionTableDirective } from "../../prospection-table.directive";

@Component({
  selector: 'prospection-table-mock',
  template: '<div></div>',
  standalone: true,
})
export class ProspectionTableDirectiveMock extends ProspectionTableDirective {}