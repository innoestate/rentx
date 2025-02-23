import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Owner } from 'src/app/core/models/owner.model';
import { loadOwners } from 'src/app/core/store/owner/owners.actions';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';
import { CELL_TYPE } from 'src/app/ux/components/ux-table/models/ux-table.cell-types';
import { UxTableColumnItem } from 'src/app/ux/components/ux-table/models/ux-table.column.model';

@Component({
  standalone: false,
  templateUrl: './owners-table.component.html',
  styleUrl: './owners-table.component.scss'
})
export class OwnersTableComponent implements OnInit {

  columns: UxTableColumnItem[] = [
    {
      key: 'name', label: 'nom et prénom',
      type: CELL_TYPE.CELL_TYPE_EDITABLE_STRING,
      sort: 0
    },
    { key: 'street', label: 'adresse', sort: 1 },
    { key: 'city', label: 'ville', sort: 2 },
    { key: 'zip', label: 'code postal', sort: 3 },
    { key: 'email', label: 'email', sort: 4 },
    { key: 'phone', label: 'phone', sort: 5 },
  ]
  owners = this.store.selectSignal(selectOwners);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadOwners());
  }

  editOwner(owner: Owner) {
  }

}
