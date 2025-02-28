import { Component, effect } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { OwnerComponent } from 'src/app/common/components/owner.component';
import { Owner } from 'src/app/core/models/owner.model';
import { UxPopupService } from 'src/app/ux/popup/services/popup.service';

@Component({
    selector: 'owner-item',
    templateUrl: './owner-item.component.html',
    styleUrl: './owner-item.component.scss',
    standalone: false
})
export class OwnerItemComponent extends OwnerComponent {

  selectedOwner: Owner | null | undefined = null;

  constructor(protected override store: Store, protected override popupService: UxPopupService, protected override actions$: Actions) {
    super(store, popupService, actions$);

    effect(() => {
      this.selectedOwner = this.estate().owner;
    })
  }

}
