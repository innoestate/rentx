import { Component, Directive, effect } from "@angular/core";
import { EstatesDataService } from "../../esates.data.service";
import { selectEstates } from "src/app/core/store/estate/estates.selectors";
import { Store } from "@ngrx/store";

@Component({
  selector: 'estates',
  template: '',
  standalone: false,
  providers: [EstatesDataService],
})
export class EstatesComponent{

  estates = this.store.selectSignal(selectEstates);

  constructor(protected estatesData: EstatesDataService, protected store: Store) {

    effect(() => {
      console.log('estates', this.estates());
    })

  }


}
