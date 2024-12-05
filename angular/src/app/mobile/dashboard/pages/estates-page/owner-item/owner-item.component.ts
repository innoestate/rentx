import { Component, effect, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OwnerComponent } from 'src/app/common/components/owner.component';
import { Owner } from 'src/app/core/models/owner.model';

@Component({
  selector: 'owner-item',
  templateUrl: './owner-item.component.html',
  styleUrl: './owner-item.component.scss'
})
export class OwnerItemComponent extends OwnerComponent {

  selectedOwner: Owner | null | undefined = null;

  constructor(protected override store: Store, protected override modalService: NzModalService, protected override actions$: Actions) {
    super(store, modalService, actions$);

    effect(() => {
      this.selectedOwner = this.estate().owner;
    })
  }

}
