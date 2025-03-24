import { Component } from "@angular/core";
import { ProspectionsTableDirective } from "../../prospections.table.directive";

@Component({
  selector: 'prospection-table-mock',
  template: '<div></div>',
  standalone: true,
})
export class ProspectionsTableDirectiveMock extends ProspectionsTableDirective {}
