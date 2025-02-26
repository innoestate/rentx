import { Component, computed, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadOwners } from 'src/app/core/store/owner/owners.actions';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';
import { UxTableRow } from 'src/app/ux/components/ux-table/models/ux-table-row.model';
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
      target: [
        { label: '5em', target: 'lyon5' },
        { label: '3em ', target: 'lyon3' },
        { label: '8em ', target: 'lyon8' },
        {
          label: 'nested2', target: [
            { label: 'quartier X', target: 'nested2-5' },
            { label: 'quartier Y ', target: 'nested2-3' },
            {
              label: 'command', command: () => {
                alert('YES')
                return true;
              }
            },
            { label: 'et z ', target: 'nested2-8' },
          ]
        },
        {
          label: 'message', target: 'lyon-message', command: () => {
            alert('OK!');
            return true;
          }
        }
      ]
    }
  ];

  languages = [
    { label: 'Français', target: 'fr' },
    { label: 'Anglais ', target: 'en' },
    { label: 'Espagnol ', target: 'es' }
  ];

  columns: UxTableColumnItem[] = [
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
  ]
  owners = computed(() => {
    return (this.store.selectSignal(selectOwners)().map(
      owner => ({
        ...owner,
        zip: parseInt(owner.zip, 10),
        language: { ...this.languages[Math.floor(Math.random() * this.languages.length)] },
        city: { ...this.cities[Math.floor(Math.random() * this.cities.length)] },
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
