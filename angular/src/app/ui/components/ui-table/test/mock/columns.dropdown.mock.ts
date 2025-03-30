import { UiTableColumnItem } from "../../models/ui-table.column.model";

export const columnsWithCityAsDropDownMock: UiTableColumnItem[] = [
  {
    key: 'id',
    label: 'ID',
    type: 'text'
  },
  {
    key: 'name',
    label: 'Name',
    editable: true,
    type: 'text'
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text'
  },
  {
    key: 'phone',
    label: 'Phone',
    type: 'text'
  },
  {
    key: 'zip',
    label: 'Zip',
    type: 'text'
  },
  {
    key: 'language',
    label: 'Langue',
    type: 'text',
    sort: 1,
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
    type: 'dropdown',
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

export const LANGUAGES_COLUMN_INDEX = 6;
