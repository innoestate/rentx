import { Directive } from "@angular/core";
import { EstatesBusiness } from "../business/estates.business";

@Directive()
export class EstatesTableDirective{

  estatesTable = this.estatesBusiness.getTableList();

  constructor(protected estatesBusiness: EstatesBusiness) { }


}
