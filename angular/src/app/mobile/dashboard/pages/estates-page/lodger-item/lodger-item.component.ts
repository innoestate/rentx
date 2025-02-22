import { Component, effect } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LodgerComponent } from 'src/app/common/components/lodger.component';
import { RentService } from 'src/app/common/services/rents.service';
import { Lodger } from 'src/app/core/models/lodger.model';

@Component({
    selector: 'lodger-item',
    templateUrl: './lodger-item.component.html',
    styleUrl: './lodger-item.component.scss',
    standalone: false
})
export class LodgerItemComponent extends LodgerComponent{

  selectedLodger: Lodger | null | undefined = null;

  constructor(protected override store: Store, protected override actions$: Actions, protected override rentService: RentService) {
    super(store, actions$, rentService);

    effect(() => {
      this.selectedLodger = this.estate().lodger;
    })
  }

}
