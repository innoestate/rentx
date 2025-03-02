import { UiTableColumnItem } from "../../models/ui-table.column.model";

export const columnsWithCityAsDropDownMock: UiTableColumnItem[] = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'Name',
    editable: true,
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'phone',
    label: 'Phone'
  },
  {
    key: 'zip',
    label: 'Zip',
  },
  {
    key: 'language',
    label: 'Langue',
    dropDownItems: [
      {
        label: 'Français',
        value: 'fr'
      },
      {
        label: 'English',
        value: 'en'
      },
      {
        label: 'Espagnol',
        value: 'es'
      }
    ],
  },
  {
    key: 'skills',
    label: 'Compétences',
    dropDownItems: [
      {
        label: 'Developer',
        value: 'dev'
      },
      {
        label: 'ui designer',
        value: 'ui'
      },
      {
        label: 'Product owner',
        value: 'po'
      },
      {
        label: 'R&D',
        value: [
          {
            label: 'Product owner',
            value: 'po'
          },
          {
            label: 'Developer',
            value: 'dev'
          },
          {
            label: 'ui designer',
            value: 'ui'
          },
        ]
      },
      {
        label: 'Sales',
        value: [
          {
            label: 'Dirrecteur de vente',
            value: 'sales director'
          },
          {
            label: 'Setter',
            value: 'setter'
          }
        ]
      }
    ],
  }
]
