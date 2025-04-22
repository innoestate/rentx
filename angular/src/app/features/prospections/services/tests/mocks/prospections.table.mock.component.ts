import { Component } from "@angular/core";
import { ProspectionsTableService } from "../../prospections.table.adapter";

@Component({
  selector: 'prospection-table-mock',
  template: '<div></div>',
  standalone: true,
})
export class ProspectionsTableComponentMock extends ProspectionsTableService {}
