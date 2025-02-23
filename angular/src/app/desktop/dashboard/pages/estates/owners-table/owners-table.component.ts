import { Component, computed, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadOwners } from 'src/app/core/store/owner/owners.actions';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';
import { UxTableRow } from 'src/app/ux/components/ux-table/models/ux-table-row.model';
import { CELL_TYPE_ENUM } from 'src/app/ux/components/ux-table/enums/ux-table.cell.enum';
import { UxTableColumnItem } from 'src/app/ux/components/ux-table/models/ux-table.column.model';

@Component({
  standalone: false,
  templateUrl: './owners-table.component.html',
  styleUrl: './owners-table.component.scss'
})
export class OwnersTableComponent implements OnInit {

  cities = [
    {
      label: 'Paris',
      target: 'paris'
    },
    {
      label: 'Marseille',
      target: 'marseille'
    },
    {
      label: 'Lyon',
      target: 'lyon'
    }
  ];

  columns: UxTableColumnItem[] = [
    {
      key: 'name', label: 'nom et prénom',
      type: CELL_TYPE_ENUM.EDITABLE_STRING,
      sort: 0
    },
    { key: 'street', label: 'adresse', sort: 1 },
    { key: 'city', label: 'ville', dropDownItems: this.cities, type: CELL_TYPE_ENUM.DROPDOWN },
    { key: 'zip', label: 'code postal', sort: 3, type: CELL_TYPE_ENUM.EDITABLE_NUMBER },
    { key: 'email', label: 'email', sort: 4 },
    { key: 'phone', label: 'phone', sort: 5 },
  ]
  owners = computed(() => {
    return (this.store.selectSignal(selectOwners)().map(
      owner => ({
        ...owner,
        city: {...this.cities[Math.floor(Math.random() * this.cities.length)]}
      })
    )) as unknown as UxTableRow[];

  })

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadOwners());
  }

  editOwner(owner: any) {

  }

}
