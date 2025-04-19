import { Component } from "@angular/core";
import { SellersTableDirective } from "../../sellers.table.service";

@Component({
  selector: 'sellers-table-mock',
  template: '<div></div>',
  standalone: true,
})
export class SellersTableComponentMock extends SellersTableDirective {}
