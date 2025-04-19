import { Component } from "@angular/core";
import { ProspectionsTableService } from "../../prospections.table.service";

@Component({
  selector: 'prospection-table-mock',
  template: '<div></div>',
  standalone: true,
})
export class ProspectionsTableComponentMock extends ProspectionsTableService {}
