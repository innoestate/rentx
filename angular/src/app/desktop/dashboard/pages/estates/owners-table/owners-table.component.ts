import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Owner } from 'src/app/core/models/owner.model';
import { loadOwners } from 'src/app/core/store/owner/owners.actions';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';
import { CELL_TYPE } from 'src/app/ux/components/ux-table/models/ux-table.cell-types';

@Component({
  standalone: false,
  templateUrl: './owners-table.component.html',
  styleUrl: './owners-table.component.scss'
})
export class OwnersTableComponent implements OnInit {

  columns = [
    { key: 'name', label: 'nom et prénom', type: CELL_TYPE.CELL_TYPE_EDITABLE_STRING },
    { key: 'street', label: 'adresse' },
    { key: 'city', label: 'ville' },
    { key: 'zip', label: 'code postal' },
    { key: 'email', label: 'email' },
    { key: 'phone', label: 'phone' },
  ]
  owners = this.store.selectSignal(selectOwners);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadOwners());
  }

  editOwner(owner: Owner) {
    console.log('edit owner', owner);
  }

}
