import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';

@Component({
  standalone: false,
  templateUrl: './owners-table.component.html',
  styleUrl: './owners-table.component.scss'
})
export class OwnersTableComponent {

  columns = [
    { key: 'name', label: 'address' },
    { key: 'street', label: 'city' },
    { key: 'city', label: 'city' },
    { key: 'zip', label: 'zip' },
    { key: 'email', label: 'email' },
    { key: 'phone', label: 'phone' },
  ]
  owners = this.store.selectSignal(selectOwners);

  constructor(private store: Store) { }

}
