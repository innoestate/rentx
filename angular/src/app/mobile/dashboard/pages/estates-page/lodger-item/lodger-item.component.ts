import { Component, effect } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LodgerComponent } from 'src/app/common/components/lodger.component';
import { Lodger } from 'src/app/core/models/lodger.model';

@Component({
  selector: 'lodger-item',
  templateUrl: './lodger-item.component.html',
  styleUrl: './lodger-item.component.scss'
})
export class LodgerItemComponent extends LodgerComponent{

  selectedLodger: Lodger | null | undefined = null;

  constructor(protected override store: Store, protected override modalService: NzModalService, protected override actions$: Actions) {
    super(store, modalService, actions$);

    effect(() => {
      this.selectedLodger = this.estate().lodger;
    })
  }

}
