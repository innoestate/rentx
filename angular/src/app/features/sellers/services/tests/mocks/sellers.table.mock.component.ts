import { Component } from "@angular/core";
import { SellersTableService } from "../../sellers.table.service";

@Component({
  selector: 'sellers-table-mock',
  template: '<div></div>',
  standalone: true,
})
export class SellersTableComponentMock extends SellersTableService {}
