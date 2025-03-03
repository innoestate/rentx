import { Component, computed, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadOwners } from 'src/app/core/store/owner/owners.actions';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';
import { UiTableRow } from 'src/app/ui/components/ui-table/models/ui-table-row.model';
import { UiTableColumnItem } from 'src/app/ui/components/ui-table/models/ui-table.column.model';

@Component({
  standalone: false,
  templateUrl: './owners-table.component.html',
  styleUrl: './owners-table.component.scss'
})
export class OwnersTableComponent implements OnInit {

  cities = [
    {
      label: 'Paris',
      value: 'paris'
    },
    {
      label: 'Marseille',
      value: 'marseille'
    },
    {
      label: 'Lyon',
      value: [
        { label: '5em', value: 'lyon5' },
        { label: '3em ', value: 'lyon3' },
        { label: '8em ', value: 'lyon8' },
        {
          label: 'nested2', value: [
            { label: 'quartier X', value: 'nested2-5' },
            { label: 'quartier Y ', value: 'nested2-3' },
            {
              label: 'command', command: () => {
                alert('YES')
                return true;
              }
            },
            { label: 'et z ', value: 'nested2-8' },
          ]
        },
        {
          label: 'message', value: 'lyon-message', command: () => {
            alert('OK!');
            return true;
          }
        }
      ]
    }
  ];

  languages = [
    { label: 'Français', value: 'fr' },
    { label: 'Anglais ', value: 'en' },
    { label: 'Espagnol ', value: 'es' }
  ];

  columns: UiTableColumnItem[] = [
    {
      key: 'name', label: 'nom et prénom',
      editable: true
    },
    { key: 'street', label: 'adresse', sort: 1 },
    { key: 'city', label: 'ville', dropDownItems: this.cities },
    { key: 'zip', label: 'code postal', sort: 3, editable: true },
    { key: 'language', label: 'langue', dropDownItems: this.languages },
    { key: 'email', label: 'email', sort: 4 },
    { key: 'phone', label: 'phone', sort: 5 },
    { key: 'delete', label: 'delete'}
  ]
  owners = computed(() => {
    return (this.store.selectSignal(selectOwners)().map(
      owner => ({
        data: owner,
        cells: {
          ...owner,
          zip: parseInt(owner.zip, 10),
          language: { ...this.languages[Math.floor(Math.random() * this.languages.length)] },
          city: { ...this.cities[Math.floor(Math.random() * this.cities.length)] },
          delete: {icon: 'delete', command: () => {
            alert('YES')
            return true;
          }}
        }
      })
    )) as unknown as UiTableRow[];

  })

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadOwners());
  }

  editOwner(owner: any) {

  }

}
