import { Component, Directive, effect } from "@angular/core";
import { selectEstates } from "src/app/core/store/estate/estates.selectors";
import { Store } from "@ngrx/store";
import { EstatesDataService } from "../../esates.data.service";

@Component({
  selector: 'estates',
  template: '',
  standalone: false,
  providers: [EstatesDataService],
})
export class EstatesComponent{

  estates = this.store.selectSignal(selectEstates);

  constructor(protected estatesData: EstatesDataService, protected store: Store) {}


}
